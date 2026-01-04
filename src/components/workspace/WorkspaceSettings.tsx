import { Format } from "@ark-ui/react";
import {
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Icon,
  Menu,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuSeparator,
  Stack,
  Text,
  sigil,
} from "@omnidev/sigil";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  useLoaderData,
  useNavigate,
  useParams,
  useRouteContext,
} from "@tanstack/react-router";
import { LuCheck, LuClockAlert } from "react-icons/lu";
import { RiUserSharedLine } from "react-icons/ri";

import DangerZoneAction from "@/components/core/DangerZoneAction";
import SectionContainer from "@/components/layout/SectionContainer";
import {
  FREE_PRODUCT_DETAILS,
  sortBenefits,
} from "@/components/pricing/PricingCard";
import UpdateWorkspace from "@/components/workspace/UpdateWorkspace";
import {
  Role,
  useDeleteWorkspaceMutation,
  useLeaveWorkspaceMutation,
} from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { BASE_URL } from "@/lib/config/env.config";
import { membersOptions } from "@/lib/options/members";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";
import toaster from "@/lib/util/toaster";
import {
  getBillingPortalUrl,
  getCreateSubscriptionUrl,
  renewSubscription,
  revokeSubscription,
} from "@/server/functions/subscriptions";

import type { DestructiveActionProps } from "@/components/core/DestructiveAction";
import type { WorkspaceRow } from "@/components/profile/UserWorkspaces";
import type { ExpandedProductPrice } from "@/server/functions/prices";

const deleteWorkspaceDetails = app.workspaceSettingsPage.cta.deleteWorkspace;
const leaveWorkspaceDetails = app.workspaceSettingsPage.cta.leaveWorkspace;

interface Props {
  /** Workspace details. */
  workspace: WorkspaceRow;
  /** App subscription pricing options. */
  prices: ExpandedProductPrice[];
}

/** Workspace settings. */
const WorkspaceSettings = ({ workspace, prices }: Props) => {
  const { workspaceSlug } = useParams({
    from: "/_auth/workspaces/$workspaceSlug/_layout/_manage/settings",
  });
  const { isOwner, membershipId, queryClient, workspaceId } = useRouteContext({
    from: "/_auth/workspaces/$workspaceSlug/_layout/_manage/settings",
  });
  const { subscription } = useLoaderData({
    from: "/_auth/workspaces/$workspaceSlug/_layout/_manage/settings",
  });
  const navigate = useNavigate();

  const subscriptionPrice = prices.find(
    (price) =>
      price.product.id === subscription?.product.id &&
      price.id === subscription?.priceId,
  );

  const { data: numberOfOwners } = useQuery({
    ...membersOptions({
      workspaceId,
      roles: [Role.Owner],
    }),
    select: (data) => data.members?.totalCount,
  });

  const { mutateAsync: deleteWorkspace } = useDeleteWorkspaceMutation({
      onMutate: () => navigate({ to: "/", replace: true }),
      // NB: when a workspace is deleted, we want to invalidate all queries as any of them could have data for said workspace associated with the user
      onSettled: async () => queryClient.invalidateQueries(),
    }),
    { mutate: leaveWorkspace } = useLeaveWorkspaceMutation({
      onMutate: () => navigate({ to: "/", replace: true }),
      // NB: when a user leaves a workspace, we want to invalidate all queries as any of them could have data for said workspace associated with the user
      onSettled: async () => queryClient.invalidateQueries(),
    });

  const isOnlyOwner = isOwner && numberOfOwners === 1;

  const DELETE_WORKSPACE: DestructiveActionProps = {
    title: deleteWorkspaceDetails.destruciveAction.title,
    description: deleteWorkspaceDetails.destruciveAction.description,
    triggerLabel: deleteWorkspaceDetails.destruciveAction.actionLabel,
    destructiveInput: deleteWorkspaceDetails.destruciveAction.prompt,
    action: {
      label: deleteWorkspaceDetails.destruciveAction.actionLabel,
      onClick: () =>
        toaster.promise(
          async () => {
            if (subscription) {
              const revokedSubscriptionId = await revokeSubscription({
                data: { subscriptionId: subscription.id },
              });

              if (!revokedSubscriptionId)
                throw new Error("Error revoking subscription");
            }

            await deleteWorkspace({ rowId: workspaceId });
          },
          {
            loading: {
              title: "Deleting workspace...",
            },
            success: {
              title: "Successfully deleted workspace.",
            },
            error: {
              title: "Error",
              description:
                "Sorry, there was an issue with deleting your workspace. Please try again.",
            },
          },
        ),
    },
    children: (
      <Text whiteSpace="wrap" fontWeight="medium">
        The workspace will be <sigil.span color="red">permanently</sigil.span>{" "}
        deleted, including its projects, posts and comments. Any subscription
        associated with the workspace will be immediately{" "}
        <sigil.span color="red">revoked</sigil.span>.
      </Text>
    ),
  };

  const LEAVE_WORKSPACE: DestructiveActionProps = {
    title: leaveWorkspaceDetails.destruciveAction.title,
    description: leaveWorkspaceDetails.destruciveAction.description,
    triggerLabel: leaveWorkspaceDetails.destruciveAction.actionLabel,
    icon: RiUserSharedLine,
    action: {
      label: leaveWorkspaceDetails.destruciveAction.actionLabel,
      onClick: () =>
        leaveWorkspace({
          rowId: membershipId!,
        }),
    },
  };

  const {
    mutateAsync: createSubscription,
    isPending: isCreateSubscriptionPending,
  } = useMutation({
    mutationFn: async ({ priceId }: { priceId: string }) => {
      const checkoutUrl = await getCreateSubscriptionUrl({
        data: {
          priceId,
          workspaceId,
          successUrl: `${BASE_URL}/workspaces/${workspaceSlug}/settings`,
        },
      });

      return checkoutUrl;
    },
    onSuccess: (url) => navigate({ href: url, reloadDocument: true }),
  });

  const { mutateAsync: openBillingPortal } = useMutation({
    mutationFn: async () => {
      const portalUrl = await getBillingPortalUrl({
        data: {
          workspaceId,
          returnUrl: `${BASE_URL}/workspaces/${workspaceSlug}/settings`,
        },
      });

      return portalUrl;
    },
    onSuccess: (url) => navigate({ href: url, reloadDocument: true }),
  });

  return (
    <Stack gap={6}>
      <UpdateWorkspace />

      {isOwner && (
        <SectionContainer
          title="Manage Subscription"
          description="Update your workspace's subscription to unlock new benefits."
        >
          <Text>
            This workspace is currently on the Backfeed{" "}
            <sigil.span color="brand.primary">
              {capitalizeFirstLetter(workspace?.tier)}
            </sigil.span>{" "}
            tier. Benefits included in this plan are:
          </Text>
          <Grid w="full" lineHeight={1.5}>
            {sortBenefits(
              subscriptionPrice?.product.marketing_features ??
                FREE_PRODUCT_DETAILS.marketing_features,
            ).map((feature) => {
              const isComingSoon = feature.name?.includes("coming soon");

              return (
                <GridItem key={feature.name} display="flex" gap={2}>
                  {/* ! NB: height should match the line height of the item (set at the `Grid` level). CSS has a modern `lh` unit, but that seemingly does not work, so this is a workaround. */}
                  <sigil.span h={6} display="flex" alignItems="center">
                    <Icon
                      src={isComingSoon ? LuClockAlert : LuCheck}
                      h={4}
                      w={4}
                    />
                  </sigil.span>

                  {feature.name?.split(" (coming soon)")[0]}
                </GridItem>
              );
            })}
          </Grid>

          {subscription ? (
            <Button
              w="fit"
              onClick={async () => {
                if (workspace.subscription.toBeCanceled) {
                  await renewSubscription({
                    data: { subscriptionId: subscription.id },
                  });
                } else {
                  await openBillingPortal();
                }
              }}
            >
              {workspace.subscription.toBeCanceled ? "Renew" : "Manage"}{" "}
              Subscription
            </Button>
          ) : (
            <Menu
              trigger={
                <Button w="fit" disabled={isCreateSubscriptionPending}>
                  Upgrade Plan
                </Button>
              }
              onSelect={({ value }) => createSubscription({ priceId: value })}
            >
              <MenuItemGroup minW={40}>
                <MenuItemGroupLabel>Basic</MenuItemGroupLabel>
                {prices
                  .filter((price) => price.metadata.tier === "basic")
                  .map((price) => (
                    <MenuItem key={price.id} value={price.id}>
                      <HStack w="full" justify="space-between">
                        {capitalizeFirstLetter(price.recurring?.interval)}ly
                        <Text>
                          <Format.Number
                            value={price.unit_amount! / 100}
                            currency="USD"
                            style="currency"
                            notation="compact"
                          />
                          /{price.recurring?.interval === "month" ? "mo" : "yr"}
                        </Text>
                      </HStack>
                    </MenuItem>
                  ))}
              </MenuItemGroup>

              <MenuSeparator />

              <MenuItemGroup minW={40}>
                <MenuItemGroupLabel>Team</MenuItemGroupLabel>
                {prices
                  .filter((price) => price.metadata.tier === "team")
                  .map((price) => (
                    <MenuItem key={price.id} value={price.id}>
                      <HStack w="full" justify="space-between">
                        {capitalizeFirstLetter(price.recurring?.interval)}ly
                        <Text>
                          <Format.Number
                            value={price.unit_amount! / 100}
                            currency="USD"
                            style="currency"
                            notation="compact"
                          />
                          /{price.recurring?.interval === "month" ? "mo" : "yr"}
                        </Text>
                      </HStack>
                    </MenuItem>
                  ))}
              </MenuItemGroup>
            </Menu>
          )}
        </SectionContainer>
      )}

      <SectionContainer
        title={app.workspaceSettingsPage.dangerZone.title}
        description={app.workspaceSettingsPage.dangerZone.description}
        outline="1px solid"
        outlineColor="omni.ruby"
      >
        <Divider />

        {!isOnlyOwner && (
          <DangerZoneAction
            title={leaveWorkspaceDetails.title}
            description={leaveWorkspaceDetails.description}
            actionProps={LEAVE_WORKSPACE}
          />
        )}

        {isOwner && (
          <Stack gap={6}>
            {/* TODO: add ownership transfer when functionality is resolved. Added scope: must transfer subscription. */}

            <DangerZoneAction
              title={deleteWorkspaceDetails.title}
              description={deleteWorkspaceDetails.description}
              actionProps={DELETE_WORKSPACE}
            />
          </Stack>
        )}
      </SectionContainer>
    </Stack>
  );
};

export default WorkspaceSettings;

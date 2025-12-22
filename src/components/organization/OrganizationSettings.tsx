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
import UpdateOrganization from "@/components/organization/UpdateOrganization";
import {
  FREE_PRODUCT_DETAILS,
  sortBenefits,
} from "@/components/pricing/PricingCard";
import {
  Role,
  useDeleteOrganizationMutation,
  useLeaveOrganizationMutation,
} from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { BASE_URL } from "@/lib/config/env.config";
import { membersOptions } from "@/lib/options/members";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";
import toaster from "@/lib/util/toaster";
import {
  getCreateSubscriptionUrl,
  getManageSubscriptionUrl,
  renewSubscription,
  revokeSubscription,
} from "@/server/functions/subscriptions";

import type { DestructiveActionProps } from "@/components/core/DestructiveAction";
import type { OrganizationRow } from "@/components/profile/UserOrganizations";
import type { ExpandedProductPrice } from "@/server/functions/prices";

const deleteOrganizationDetails =
  app.organizationSettingsPage.cta.deleteOrganization;
const leaveOrganizationDetails =
  app.organizationSettingsPage.cta.leaveOrganization;

interface Props {
  /** Organization details. */
  organization: OrganizationRow;
  /** App subscription pricing options. */
  prices: ExpandedProductPrice[];
}

/** Organization settings. */
const OrganizationSettings = ({ organization, prices }: Props) => {
  const { organizationSlug } = useParams({
    from: "/_auth/organizations/$organizationSlug/_layout/_manage/settings",
  });
  const { isOwner, membershipId, queryClient, organizationId } =
    useRouteContext({
      from: "/_auth/organizations/$organizationSlug/_layout/_manage/settings",
    });
  const { subscription } = useLoaderData({
    from: "/_auth/organizations/$organizationSlug/_layout/_manage/settings",
  });
  const navigate = useNavigate();

  const subscriptionPrice = prices.find(
    (price) =>
      price.product.id === subscription?.product.id &&
      price.id === subscription?.priceId,
  );

  const { data: numberOfOwners } = useQuery({
    ...membersOptions({
      organizationId,
      roles: [Role.Owner],
    }),
    select: (data) => data.members?.totalCount,
  });

  const { mutateAsync: deleteOrganization } = useDeleteOrganizationMutation({
      onMutate: () => navigate({ to: "/", replace: true }),
      // NB: when an organization is deleted, we want to invalidate all queries as any of them could have data for said org associated with the user
      onSettled: async () => queryClient.invalidateQueries(),
    }),
    { mutate: leaveOrganization } = useLeaveOrganizationMutation({
      onMutate: () => navigate({ to: "/", replace: true }),
      // NB: when a user leaves an organization, we want to invalidate all queries as any of them could have data for said org associated with the user
      onSettled: async () => queryClient.invalidateQueries(),
    });

  const isOnlyOwner = isOwner && numberOfOwners === 1;

  const DELETE_ORGANIZATION: DestructiveActionProps = {
    title: deleteOrganizationDetails.destruciveAction.title,
    description: deleteOrganizationDetails.destruciveAction.description,
    triggerLabel: deleteOrganizationDetails.destruciveAction.actionLabel,
    destructiveInput: deleteOrganizationDetails.destruciveAction.prompt,
    action: {
      label: deleteOrganizationDetails.destruciveAction.actionLabel,
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

            await deleteOrganization({ rowId: organizationId });
          },
          {
            loading: {
              title: "Deleting organization...",
            },
            success: {
              title: "Successfully deleted organization.",
            },
            error: {
              title: "Error",
              description:
                "Sorry, there was an issue with deleting your organization. Please try again.",
            },
          },
        ),
    },
    children: (
      <Text whiteSpace="wrap" fontWeight="medium">
        The organization will be{" "}
        <sigil.span color="red">permanently</sigil.span> deleted, including its
        projects, posts and comments. Any subscription associated with the
        organization will be immediately{" "}
        <sigil.span color="red">revoked</sigil.span>.
      </Text>
    ),
  };

  const LEAVE_ORGANIZATION: DestructiveActionProps = {
    title: leaveOrganizationDetails.destruciveAction.title,
    description: leaveOrganizationDetails.destruciveAction.description,
    triggerLabel: leaveOrganizationDetails.destruciveAction.actionLabel,
    icon: RiUserSharedLine,
    action: {
      label: leaveOrganizationDetails.destruciveAction.actionLabel,
      onClick: () =>
        leaveOrganization({
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
          organizationId,
          successUrl: `${BASE_URL}/organizations/${organizationSlug}/settings`,
        },
      });

      return checkoutUrl;
    },
    onSuccess: (url) => navigate({ href: url, reloadDocument: true }),
  });

  const { mutateAsync: manageSubscription } = useMutation({
    mutationFn: async () => {
      const checkoutUrl = await getManageSubscriptionUrl({
        data: {
          subscriptionId: subscription?.id,
          returnUrl: `${BASE_URL}/organizations/${organizationSlug}/settings`,
        },
      });

      return checkoutUrl;
    },
    onSuccess: (url) => navigate({ href: url, reloadDocument: true }),
  });

  return (
    <Stack gap={6}>
      <UpdateOrganization />

      {isOwner && (
        <SectionContainer
          title="Manage Subscription"
          description="Update your organization's subscription to unlock new benefits."
        >
          <Text>
            This organization is currently on the Backfeed{" "}
            <sigil.span color="brand.primary">
              {capitalizeFirstLetter(organization?.tier)}
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
                if (organization.subscription.toBeCanceled) {
                  await renewSubscription({
                    data: { subscriptionId: subscription.id },
                  });
                } else {
                  await manageSubscription();
                }
              }}
            >
              {organization.subscription.toBeCanceled ? "Renew" : "Manage"}{" "}
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
        title={app.organizationSettingsPage.dangerZone.title}
        description={app.organizationSettingsPage.dangerZone.description}
        outline="1px solid"
        outlineColor="omni.ruby"
      >
        <Divider />

        {!isOnlyOwner && (
          <DangerZoneAction
            title={leaveOrganizationDetails.title}
            description={leaveOrganizationDetails.description}
            actionProps={LEAVE_ORGANIZATION}
          />
        )}

        {isOwner && (
          <Stack gap={6}>
            {/* TODO: add ownership transfer when functionality is resolved. Added scope: must transfer subscription. */}

            <DangerZoneAction
              title={deleteOrganizationDetails.title}
              description={deleteOrganizationDetails.description}
              actionProps={DELETE_ORGANIZATION}
            />
          </Stack>
        )}
      </SectionContainer>
    </Stack>
  );
};

export default OrganizationSettings;

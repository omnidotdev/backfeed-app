"use client";

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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { LuCheck, LuClockAlert } from "react-icons/lu";
import { RiUserSharedLine } from "react-icons/ri";

import { DangerZoneAction } from "components/core";
import { SectionContainer } from "components/layout";
import { UpdateOrganization } from "components/organization";
import {
  FREE_PRODUCT_DETAILS,
  sortBenefits,
} from "components/pricing/PricingCard/PricingCard";
import {
  Role,
  useDeleteOrganizationMutation,
  useLeaveOrganizationMutation,
  useMembersQuery,
} from "generated/graphql";
import {
  createCheckoutSession,
  renewSubscription,
  revokeSubscription,
} from "lib/actions";
import { BASE_URL, app } from "lib/config";
import { useOrganizationMembership } from "lib/hooks";
import { capitalizeFirstLetter, toaster } from "lib/util";

import type { DestructiveActionProps } from "components/core";
import type { Price } from "components/pricing/PricingOverview/PricingOverview";
import type {
  CustomerState,
  OrganizationRow,
} from "components/profile/Subscription/Subscriptions";
import type { Session } from "next-auth";

const deleteOrganizationDetails =
  app.organizationSettingsPage.cta.deleteOrganization;
const leaveOrganizationDetails =
  app.organizationSettingsPage.cta.leaveOrganization;

interface Props {
  /** Authenticated user. */
  user: Session["user"];
  /** Organization details. */
  organization: OrganizationRow;
  /** Customer information derived from the authenticated user. */
  customer: CustomerState | undefined;
  /** App subscription pricing options. */
  prices: Price[];
}

/** Organization settings. */
const OrganizationSettings = ({
  user,
  organization,
  customer,
  prices,
}: Props) => {
  const router = useRouter();

  const subscription = customer?.subscriptions.find(
    (sub) => sub.id === organization.subscriptionId,
  );

  const subscriptionPrice = prices.find(
    (price) =>
      price.product.id === subscription?.items.data[0].plan.product &&
      price.id === subscription?.items.data[0].plan.id,
  );

  const queryClient = useQueryClient();

  const { data: numberOfOwners } = useMembersQuery(
    {
      organizationId: organization.rowId,
      roles: [Role.Owner],
    },
    {
      select: (data) => data.members?.totalCount,
    },
  );

  const { isOwner, membershipId } = useOrganizationMembership({
    userId: user.rowId,
    organizationId: organization.rowId,
  });

  const { mutateAsync: deleteOrganization } = useDeleteOrganizationMutation({
      onMutate: () => router.replace("/"),
      // NB: when an organization is deleted, we want to invalidate all queries as any of them could have data for said org associated with the user
      onSettled: async () => queryClient.invalidateQueries(),
    }),
    { mutate: leaveOrganization } = useLeaveOrganizationMutation({
      onMutate: () => router.replace("/"),
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
            if (organization.subscriptionId) {
              const revokedSubscriptionId = await revokeSubscription({
                subscriptionId: organization.subscriptionId,
              });

              if (!revokedSubscriptionId)
                throw new Error("Error revoking subscription");
            }

            await deleteOrganization({ rowId: organization.rowId });
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
      const checkoutUrl = await createCheckoutSession({
        checkout: {
          type: "create",
          priceId,
          organizationId: organization.rowId!,
          successUrl: `${BASE_URL}/organizations/${organization.slug}/settings`,
        },
      });

      return checkoutUrl;
    },
    onSuccess: (url) => router.push(url),
  });

  const { mutateAsync: manageSubscription } = useMutation({
    mutationFn: async () => {
      const checkoutUrl = await createCheckoutSession({
        checkout: {
          type: "update",
          subscriptionId: organization.subscriptionId!,
          returnUrl: `${BASE_URL}/organizations/${organization.slug}/settings`,
        },
      });

      return checkoutUrl;
    },
    onSuccess: (url) => router.push(url),
  });

  return (
    <Stack gap={6}>
      <UpdateOrganization user={user} />

      {isOwner && (
        <SectionContainer
          title="Manage Subscription"
          description="Update your organization's subscription to unlock new benefits."
        >
          <Text>
            This organization is currently on the Backfeed{" "}
            <sigil.span color="brand.primary">
              {capitalizeFirstLetter(organization.tier)}
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

          {organization.subscriptionId ? (
            <Button
              w="fit"
              onClick={async () => {
                if (organization.subscription.toBeCanceled) {
                  await renewSubscription({
                    subscriptionId: organization.subscriptionId!,
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
                <MenuItemGroupLabel>Monthly</MenuItemGroupLabel>
                {prices
                  .filter((price) => price.recurring?.interval === "month")
                  .map((price) => (
                    <MenuItem key={price.id} value={price.id}>
                      <HStack w="full" justify="space-between">
                        {capitalizeFirstLetter(price.metadata.tier)}
                        <Text>
                          <Format.Number
                            value={price.unit_amount! / 100}
                            currency="USD"
                            style="currency"
                            notation="compact"
                          />
                          /mo
                        </Text>
                      </HStack>
                    </MenuItem>
                  ))}
              </MenuItemGroup>

              <MenuSeparator />

              <MenuItemGroup minW={40}>
                <MenuItemGroupLabel>Yearly</MenuItemGroupLabel>
                {prices
                  .filter((price) => price.recurring?.interval === "year")
                  .map((price) => (
                    <MenuItem key={price.id} value={price.id}>
                      <HStack w="full" justify="space-between">
                        {capitalizeFirstLetter(price.metadata.tier)}
                        <Text>
                          <Format.Number
                            value={price.unit_amount! / 100}
                            currency="USD"
                            style="currency"
                            notation="compact"
                          />
                          /yr
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

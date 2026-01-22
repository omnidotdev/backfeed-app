import { Format } from "@ark-ui/react";
import {
  Button,
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
import { useMutation } from "@tanstack/react-query";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { LuCheck, LuClockAlert } from "react-icons/lu";

import SectionContainer from "@/components/layout/SectionContainer";
import { BASE_URL } from "@/lib/config/env.config";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";
import { FREE_PRODUCT_DETAILS, sortBenefits } from "@/lib/util/pricing";
import {
  getBillingPortalUrl,
  getCreateSubscriptionUrl,
  renewSubscription,
} from "@/server/functions/subscriptions";

import type { ExpandedProductPrice } from "@/server/functions/prices";

const settingsRoute = getRouteApi(
  "/_public/workspaces/$workspaceSlug/_layout/_manage/settings",
);

interface Props {
  /** App subscription pricing options. */
  prices: ExpandedProductPrice[];
}

/**
 * Workspace settings.
 *
 * Organization name/slug are managed by Gatekeeper (IDP), not this app.
 * This component handles subscription management at the organization level.
 */
const WorkspaceSettings = ({ prices }: Props) => {
  const { workspaceSlug } = settingsRoute.useParams();
  const { isOwner, organizationId, workspaceName } =
    settingsRoute.useRouteContext();
  const { subscription } = settingsRoute.useLoaderData();
  const navigate = useNavigate();

  const subscriptionPrice = prices.find(
    (price) =>
      price.product.id === subscription?.product?.id &&
      price.id === subscription?.priceId,
  );

  // Derive tier from subscription - if no subscription, it's free tier
  const tier = subscription
    ? (subscriptionPrice?.metadata?.tier ?? "basic")
    : "free";

  const {
    mutateAsync: createSubscription,
    isPending: isCreateSubscriptionPending,
  } = useMutation({
    mutationFn: async ({ priceId }: { priceId: string }) => {
      const checkoutUrl = await getCreateSubscriptionUrl({
        data: {
          priceId,
          organizationId,
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
          organizationId,
          returnUrl: `${BASE_URL}/workspaces/${workspaceSlug}/settings`,
        },
      });

      return portalUrl;
    },
    onSuccess: (url) => navigate({ href: url, reloadDocument: true }),
  });

  return (
    <Stack gap={6}>
      {/* Organization name/slug are managed in Gatekeeper */}
      <SectionContainer
        title="Organization Settings"
        description="Organization details are managed in your identity provider."
      >
        <Text>
          <sigil.span fontWeight="semibold">Name:</sigil.span> {workspaceName}
        </Text>
        <Text color="fg.muted" fontSize="sm">
          To update organization name or slug, visit your organization settings
          in Gatekeeper.
        </Text>
      </SectionContainer>

      {isOwner && (
        <SectionContainer
          title="Manage Subscription"
          description="Update your workspace's subscription to unlock new benefits."
        >
          <Text>
            This workspace is currently on the Backfeed{" "}
            <sigil.span color="brand.primary">
              {capitalizeFirstLetter(tier)}
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
                if (subscription.cancelAt) {
                  await renewSubscription({
                    data: { organizationId },
                  });
                } else {
                  await openBillingPortal();
                }
              }}
            >
              {subscription.cancelAt ? "Renew" : "Manage"} Subscription
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
    </Stack>
  );
};

export default WorkspaceSettings;

import { Format } from "@ark-ui/react";
import { Portal } from "@ark-ui/react/portal";
import { useMutation } from "@tanstack/react-query";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { LuCheck, LuClockAlert, LuExternalLink } from "react-icons/lu";

import SectionContainer from "@/components/layout/SectionContainer";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuPositioner,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { AUTH_BASE_URL, BASE_URL } from "@/lib/config/env.config";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";
import { FREE_PRODUCT_DETAILS, sortBenefits } from "@/lib/util/pricing";
import cn from "@/lib/utils";
import {
  getBillingPortalUrl,
  getCreateSubscriptionUrl,
  renewSubscription,
} from "@/server/functions/subscriptions";

import type { ExpandedProductPrice } from "@/server/functions/prices";

const settingsRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/_manage/settings",
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
    ? (subscriptionPrice?.metadata?.tier ?? "pro")
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
    <div className="flex flex-col gap-6">
      {/* Organization name/slug are managed centrally in the Omni account */}
      <SectionContainer
        title="Organization Settings"
        description="Your organization's name and URL are managed in your Omni account."
      >
        <p>
          <span className="font-semibold">Name:</span> {workspaceName}
        </p>
        <a
          href={`${AUTH_BASE_URL}/dashboard/organizations/${workspaceSlug}`}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "w-fit gap-1.5",
          )}
        >
          <LuExternalLink className="size-4" />
          Manage organization
        </a>
      </SectionContainer>

      {isOwner && (
        <SectionContainer
          title="Manage Subscription"
          description="Update your workspace's subscription to unlock new benefits."
        >
          <p>
            This workspace is currently on the Backfeed{" "}
            <span className="text-[var(--colors-brand-primary)]">
              {capitalizeFirstLetter(tier)}
            </span>{" "}
            tier. Benefits included in this plan are:
          </p>
          <div className="grid w-full leading-normal">
            {sortBenefits(
              subscriptionPrice?.product.marketing_features ??
                FREE_PRODUCT_DETAILS.marketing_features,
            ).map((feature) => {
              const isComingSoon = feature.name?.includes("coming soon");
              const FeatureIcon = isComingSoon ? LuClockAlert : LuCheck;

              return (
                <div key={feature.name} className="flex gap-2">
                  {/* ! NB: height should match the line height of the item. CSS has a modern `lh` unit, but that seemingly does not work, so this is a workaround. */}
                  <span className="flex h-6 items-center">
                    <FeatureIcon className="size-4" />
                  </span>

                  {feature.name?.split(" (coming soon)")[0]}
                </div>
              );
            })}
          </div>

          {subscription ? (
            <Button
              className="w-fit"
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
            <MenuRoot
              onSelect={({ value }) => createSubscription({ priceId: value })}
            >
              <MenuTrigger asChild>
                <Button
                  className="w-fit"
                  disabled={isCreateSubscriptionPending}
                >
                  Upgrade Plan
                </Button>
              </MenuTrigger>

              <Portal>
                <MenuPositioner>
                  <MenuContent>
                    <MenuItemGroup className="min-w-40">
                      <MenuItemGroupLabel>Pro</MenuItemGroupLabel>
                      {prices
                        .filter((price) => price.metadata.tier === "pro")
                        .map((price) => (
                          <MenuItem key={price.id} value={price.id}>
                            <div className="flex w-full items-center justify-between">
                              {capitalizeFirstLetter(price.recurring?.interval)}
                              ly
                              <span>
                                <Format.Number
                                  value={price.unit_amount! / 100}
                                  currency="USD"
                                  style="currency"
                                  notation="compact"
                                />
                                /
                                {price.recurring?.interval === "month"
                                  ? "mo"
                                  : "yr"}
                              </span>
                            </div>
                          </MenuItem>
                        ))}
                    </MenuItemGroup>

                    <MenuSeparator />

                    <MenuItemGroup className="min-w-40">
                      <MenuItemGroupLabel>Team</MenuItemGroupLabel>
                      {prices
                        .filter((price) => price.metadata.tier === "team")
                        .map((price) => (
                          <MenuItem key={price.id} value={price.id}>
                            <div className="flex w-full items-center justify-between">
                              {capitalizeFirstLetter(price.recurring?.interval)}
                              ly
                              <span>
                                <Format.Number
                                  value={price.unit_amount! / 100}
                                  currency="USD"
                                  style="currency"
                                  notation="compact"
                                />
                                /
                                {price.recurring?.interval === "month"
                                  ? "mo"
                                  : "yr"}
                              </span>
                            </div>
                          </MenuItem>
                        ))}
                    </MenuItemGroup>
                  </MenuContent>
                </MenuPositioner>
              </Portal>
            </MenuRoot>
          )}
        </SectionContainer>
      )}
    </div>
  );
};

export default WorkspaceSettings;

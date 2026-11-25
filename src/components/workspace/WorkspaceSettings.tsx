import { Format } from "@ark-ui/react";
import { Portal } from "@ark-ui/react/portal";
import { ManageTeamLink } from "@omnidotdev/providers/react";
import { getRouteApi } from "@tanstack/react-router";
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
import useHubLoginHint from "@/lib/auth/useHubLoginHint";
import { manageSubscriptionUrl, upgradePlanUrl } from "@/lib/billing/hubLinks";
import { ACCOUNT_URL, BASE_URL } from "@/lib/config/env.config";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";
import getTierFromEntitlements from "@/lib/util/getTierFromEntitlements";
import { FREE_PRODUCT_DETAILS, sortBenefits } from "@/lib/util/pricing";
import cn from "@/lib/utils";

import type { ExpandedProductPrice } from "@/server/functions/prices";

const settingsRoute = getRouteApi(
  "/_app/@{$workspaceSlug}/_layout/~/_manage/settings",
);

interface Props {
  /** App subscription pricing options. */
  prices: ExpandedProductPrice[];
}

/**
 * Workspace settings.
 *
 * Organization name/slug are managed by Gatekeeper (IDP), not this app.
 * This component shows the workspace's plan; upgrading and managing it
 * (change, cancel, renew, payment method, invoices) happen on the Omni account
 * hub, which returns to this page
 */
const WorkspaceSettings = ({ prices }: Props) => {
  const { workspaceSlug } = settingsRoute.useParams();
  const { isOwner, workspaceName } = settingsRoute.useRouteContext();
  const { subscription, entitlements } = settingsRoute.useLoaderData();
  const loginHint = useHubLoginHint();

  const subscriptionPrice = prices.find(
    (price) =>
      price.product.id === subscription?.product?.id &&
      price.id === subscription?.priceId,
  );

  // Derive the tier from the live subscription first, then fall back to the
  // entitlement tier (covers comped or manually-granted tiers that have no
  // Stripe subscription), then finally the free tier.
  const tier = subscription
    ? (subscriptionPrice?.metadata?.tier ?? "pro")
    : (getTierFromEntitlements(entitlements) ?? "free");

  const manageHref = manageSubscriptionUrl(
    ACCOUNT_URL,
    BASE_URL,
    workspaceSlug,
    loginHint,
  );

  // Buy the picked plan for this workspace on the account hub, which confirms
  // it, runs checkout, and returns to this page
  const upgradeToPrice = (priceId: string) => {
    const price = prices.find((p) => p.id === priceId);
    if (!price) return;

    const href = upgradePlanUrl(ACCOUNT_URL, BASE_URL, {
      plan: price.metadata.tier,
      interval: price.recurring?.interval === "year" ? "year" : "month",
      workspaceSlug,
      loginHint,
    });

    if (href) window.location.assign(href);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Organization name/slug are managed centrally at the Gatekeeper identity dashboard */}
      <SectionContainer
        title="Workspace Settings"
        description="Your workspace's name and URL are managed in your Omni workspace settings."
      >
        <p>
          <span className="font-semibold">Name:</span> {workspaceName}
        </p>
        {ACCOUNT_URL && workspaceSlug && (
          <ManageTeamLink
            accountBaseUrl={ACCOUNT_URL}
            orgSlug={workspaceSlug}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "w-fit gap-1.5",
            )}
          >
            <LuExternalLink className="size-4" />
            Manage workspace
          </ManageTeamLink>
        )}
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
            manageHref ? (
              <Button className="w-fit" asChild>
                <a href={manageHref}>Manage Subscription</a>
              </Button>
            ) : (
              <p className="text-foreground-subtle text-sm">
                Managing the plan is unavailable right now.
              </p>
            )
          ) : ACCOUNT_URL ? (
            <MenuRoot onSelect={({ value }) => upgradeToPrice(value)}>
              <MenuTrigger asChild>
                <Button className="w-fit">Upgrade Plan</Button>
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
          ) : (
            <p className="text-foreground-subtle text-sm">
              Upgrading the plan is unavailable right now.
            </p>
          )}
        </SectionContainer>
      )}
    </div>
  );
};

export default WorkspaceSettings;

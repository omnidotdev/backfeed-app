import { Portal } from "@ark-ui/react/portal";
import { workspacesUrl } from "@omnidotdev/providers/react";
import { Badge } from "@omnidotdev/thornberry/badge";
import { Button } from "@omnidotdev/thornberry/button";
import { Card } from "@omnidotdev/thornberry/card";
import {
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuPositioner,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from "@omnidotdev/thornberry/menu";
import {
  Link,
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { HiLockOpen, HiSparkles } from "react-icons/hi2";
import { LuBuilding, LuCheck, LuClockAlert, LuPlus } from "react-icons/lu";
import { match } from "ts-pattern";

import signIn from "@/lib/auth/signIn";
import { upgradePlanUrl } from "@/lib/billing/hubLinks";
import app from "@/lib/config/app.config";
import { ACCOUNT_URL, BASE_URL, hasBilling } from "@/lib/config/env.config";
import { Tier } from "@/lib/types/tier";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";
import { FREE_PRODUCT_DETAILS, sortBenefits } from "@/lib/util/pricing";
import cn from "@/lib/utils";

import type { ComponentProps } from "react";
import type { Subscription } from "@/lib/providers/billing";
import type { ExpandedProductPrice } from "@/server/functions/prices";

interface Props extends ComponentProps<typeof Card> {
  /** Price information. */
  price: ExpandedProductPrice | undefined;
  /** Subscription status for each organization. */
  orgSubscriptions?: Record<string, Subscription | null>;
}

/**
 * Pricing card. Provides pricing information and benefits attached to a
 * product. A paid plan is bought on the Omni account hub, the one place Omni
 * plans are sold: picking a workspace opens the hub's confirm step for that
 * plan and workspace, which runs checkout and returns here
 */
const PricingCard = ({ price, orgSubscriptions = {}, ...rest }: Props) => {
  const { session } = useRouteContext({ from: "/pricing" });
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { tier?: string };

  const isPerMonthPricing = price?.recurring?.interval === "month";

  const tier = (price?.metadata.tier as Tier) ?? Tier.Free;

  const isFreeTier = tier === Tier.Free;
  const isTeamTier = tier === Tier.Team;
  const isRecommendedTier = isTeamTier;
  const isEnterpriseTier = tier === Tier.Enterprise;

  const ActionIcon = match(tier)
    .with(Tier.Team, () => HiSparkles)
    .with(Tier.Pro, () => HiLockOpen)
    .otherwise(() => undefined);

  // Helper to get tier from subscription
  const getOrgTier = (orgId: string): string => {
    const subscription = orgSubscriptions[orgId];
    if (!subscription) return "free";
    // Product name is like "Backfeed Pro" or "Backfeed Team"
    const productName = subscription.product?.name?.toLowerCase() ?? "";
    if (productName.includes("team")) return "team";
    if (productName.includes("pro")) return "pro";
    return "free";
  };

  const TIER_ORDER = [Tier.Free, Tier.Pro, Tier.Team, Tier.Enterprise];
  const getTierIndex = (t: string): number => TIER_ORDER.indexOf(t as Tier);

  // Categorize organizations by their upgrade eligibility for this tier
  const allOrgs = session?.organizations ?? [];
  const upgradeableOrgs = allOrgs.filter(
    (org) => getTierIndex(getOrgTier(org.id)) < getTierIndex(tier),
  );
  const nonUpgradeableOrgs = allOrgs.filter(
    (org) => getTierIndex(getOrgTier(org.id)) >= getTierIndex(tier),
  );

  // Check if this card's tier matches the URL param (for post-sign-in auto-open)
  const shouldAutoOpen = search.tier === tier && !!session;

  const interval = price?.recurring?.interval === "year" ? "year" : "month";

  // The account hub's confirm step for this plan, for a workspace or (none
  // given) letting the hub ask
  const planUrl = (workspaceSlug?: string) =>
    upgradePlanUrl(ACCOUNT_URL, BASE_URL, {
      plan: tier,
      interval,
      workspaceSlug,
    });

  // A new workspace is created on the account hub's workspaces console, the
  // one place workspaces are made
  const newWorkspaceHref = workspacesUrl(ACCOUNT_URL);

  // Handle workspace selection from dropdown
  const handleWorkspaceSelect = (workspaceId: string) => {
    const href =
      workspaceId === "create-new"
        ? newWorkspaceHref
        : planUrl(allOrgs.find((org) => org.id === workspaceId)?.slug);

    if (href) window.location.assign(href);
  };

  const handleClick = () => {
    if (!session) {
      // Not logged in - sign in first, redirect back to pricing with tier
      signIn({
        redirectUrl: `${BASE_URL}/pricing?tier=${tier}`,
        action: "sign-up",
      });
      return;
    }

    // Free tier - just go to workspaces
    if (isFreeTier) {
      if (!session.organizations?.length) {
        navigate({ to: "/workspaces" });
      } else {
        const firstOrg = session.organizations[0];
        navigate({
          to: "/@{$workspaceSlug}",
          params: { workspaceSlug: firstOrg.slug },
        });
      }
      return;
    }

    // No billing configured - just go to workspaces
    if (!hasBilling) {
      navigate({ to: "/workspaces" });
      return;
    }

    // Paid tier without orgs: the hub explains a plan needs a workspace
    if (!session.organizations?.length) {
      const href = planUrl();
      if (href) window.location.assign(href);
      return;
    }

    // Has orgs - dropdown handles the rest (menu opens automatically)
  };

  // Show dropdown if authenticated, has upgradeable orgs or can create new, paid tier, billing enabled
  const showDropdown =
    !!session &&
    !isFreeTier &&
    !isEnterpriseTier &&
    hasBilling &&
    !!session.organizations?.length;

  const buttonContent = isFreeTier
    ? "Get Started"
    : isEnterpriseTier
      ? app.pricingPage.pricingCard.enterprise
      : `Continue with ${capitalizeFirstLetter(tier)}`;

  const buttonClassName = isRecommendedTier
    ? "bg-primary text-primary-foreground hover:bg-primary/90"
    : "border-primary text-primary hover:bg-primary/10 dark:text-[var(--colors-brand-primary-400)]";

  return (
    <Card
      contentProps={{ className: "flex flex-1 flex-col p-0" }}
      className={cn(
        "relative flex w-full max-w-2xl flex-col gap-4 shadow-md xl:max-w-xs",
        isRecommendedTier &&
          "outline outline-2 outline-[var(--colors-brand-primary)] outline-offset-[1.5px]",
      )}
      {...rest}
    >
      {(isRecommendedTier || isFreeTier || isEnterpriseTier) && (
        <Badge
          className={cn(
            "-top-3 -translate-x-1/2 absolute left-1/2 z-10 whitespace-nowrap rounded-full border-none px-3 py-1 font-semibold text-xs shadow-sm",
            isRecommendedTier
              ? "bg-[var(--colors-brand-primary)] text-white"
              : "bg-background-muted text-foreground-subtle",
          )}
        >
          {isRecommendedTier
            ? app.pricingPage.pricingTiers.recommended
            : isFreeTier
              ? "No credit card required"
              : app.pricingPage.pricingTiers.comingSoon}
        </Badge>
      )}

      {/* modest top padding clears the ribbon badge above the card */}
      <div className="flex w-full flex-1 flex-col items-center pt-8">
        <div className="flex w-full flex-col items-center px-6">
          <h2 className="text-center font-bold text-2xl">
            {capitalizeFirstLetter(tier)}
          </h2>

          <p className="text-center text-foreground-subtle">
            {price?.product.description ?? FREE_PRODUCT_DETAILS.description}
          </p>

          <div className="inline-flex items-center gap-2">
            <h3 className="font-bold text-4xl">
              {!isEnterpriseTier && <sup className="text-lg">$</sup>}

              {price ? price.unit_amount! / 100 : 0}
            </h3>

            {!isEnterpriseTier && (
              <span className="mt-2 ml-[-0.375rem] text-foreground-subtle text-lg">
                {!isFreeTier &&
                  (isPerMonthPricing
                    ? `/${app.pricingPage.pricingCard.month}`
                    : `/${app.pricingPage.pricingCard.year}`)}
                {isFreeTier && "/forever"}
              </span>
            )}
          </div>

          {showDropdown ? (
            <MenuRoot
              defaultOpen={shouldAutoOpen}
              onSelect={({ value }) => handleWorkspaceSelect(value)}
              positioning={{ sameWidth: true }}
            >
              <MenuTrigger asChild>
                <Button
                  className={cn("w-full text-lg", buttonClassName)}
                  variant={isRecommendedTier ? "solid" : "outline"}
                >
                  {ActionIcon && <ActionIcon className="size-4" />}
                  {buttonContent}
                </Button>
              </MenuTrigger>

              <Portal>
                <MenuPositioner>
                  <MenuContent>
                    {allOrgs.length > 0 && (
                      <>
                        <MenuItemGroup>
                          <MenuItemGroupLabel className="text-foreground-subtle">
                            Your workspaces
                          </MenuItemGroupLabel>

                          {upgradeableOrgs.map((org) => (
                            <MenuItem
                              key={org.id}
                              value={org.id}
                              className="cursor-pointer"
                            >
                              <div className="flex w-full items-center gap-2">
                                <LuBuilding className="size-4 text-foreground-subtle" />
                                <span className="flex-1 truncate font-medium text-sm">
                                  {org.name}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  Upgrade
                                </Badge>
                              </div>
                            </MenuItem>
                          ))}

                          {nonUpgradeableOrgs.map((org) => {
                            const orgTier = getOrgTier(org.id);
                            const isSameTier = orgTier === tier;

                            return (
                              <MenuItem
                                key={org.id}
                                value={org.id}
                                disabled
                                className="opacity-60"
                              >
                                <div className="flex w-full items-center gap-2">
                                  <LuBuilding className="size-4 text-foreground-subtle" />
                                  <span className="flex-1 truncate font-medium text-sm">
                                    {org.name}
                                  </span>
                                  <Badge variant="outline" className="text-xs">
                                    {isSameTier
                                      ? "Current plan"
                                      : capitalizeFirstLetter(orgTier)}
                                  </Badge>
                                </div>
                              </MenuItem>
                            );
                          })}
                        </MenuItemGroup>

                        <MenuSeparator />
                      </>
                    )}

                    {newWorkspaceHref && (
                      <MenuItemGroup>
                        <MenuItem value="create-new" className="cursor-pointer">
                          <div className="flex w-full items-center gap-2">
                            <LuPlus className="size-4 text-foreground-subtle" />
                            <span className="font-medium text-sm">
                              New workspace
                            </span>
                          </div>
                        </MenuItem>
                      </MenuItemGroup>
                    )}
                  </MenuContent>
                </MenuPositioner>
              </Portal>
            </MenuRoot>
          ) : session?.user ? (
            // Logged in but not showing dropdown (free tier or no billing)
            isFreeTier ? (
              session.organizations?.length ? (
                <Button
                  className={cn("w-full text-lg", buttonClassName)}
                  variant={isRecommendedTier ? "solid" : "outline"}
                  asChild
                >
                  <Link
                    to="/@{$workspaceSlug}"
                    params={{ workspaceSlug: session.organizations[0].slug }}
                  >
                    Go to Workspace
                  </Link>
                </Button>
              ) : (
                <Button
                  className={cn("w-full text-lg", buttonClassName)}
                  variant={isRecommendedTier ? "solid" : "outline"}
                  asChild
                >
                  <Link to="/workspaces">Go to Workspaces</Link>
                </Button>
              )
            ) : isEnterpriseTier ? (
              <Button
                className={cn("w-full text-lg", buttonClassName)}
                variant={isRecommendedTier ? "solid" : "outline"}
                disabled
              >
                {app.pricingPage.pricingCard.enterprise}
              </Button>
            ) : hasBilling && planUrl() ? (
              // Paid tier without workspaces: the hub asks which workspace
              <Button
                className={cn("w-full text-lg", buttonClassName)}
                variant={isRecommendedTier ? "solid" : "outline"}
                asChild
              >
                <a href={planUrl()}>
                  {ActionIcon && <ActionIcon className="size-4" />}
                  {buttonContent}
                </a>
              </Button>
            ) : (
              <Button
                className={cn("w-full text-lg", buttonClassName)}
                variant={isRecommendedTier ? "solid" : "outline"}
                onClick={handleClick}
              >
                {ActionIcon && <ActionIcon className="size-4" />}
                {buttonContent}
              </Button>
            )
          ) : (
            // Not logged in
            <Button
              className={cn("w-full text-lg", buttonClassName)}
              disabled={isEnterpriseTier}
              variant={isRecommendedTier ? "solid" : "outline"}
              onClick={() =>
                signIn({
                  redirectUrl: `${BASE_URL}/pricing?tier=${tier}`,
                  action: "sign-up",
                })
              }
            >
              {ActionIcon && <ActionIcon className="size-4" />}

              {isEnterpriseTier
                ? app.pricingPage.pricingCard.enterprise
                : app.pricingPage.pricingCard.getStarted}
            </Button>
          )}
        </div>

        <div className="mt-6 flex w-full flex-1 flex-col bg-background-subtle p-6 dark:bg-background-subtle/25">
          <div className="grid w-full grid-cols-1 leading-normal sm:grid-cols-2 lg:grid-cols-1">
            {sortBenefits(
              price?.product.marketing_features ??
                FREE_PRODUCT_DETAILS.marketing_features,
            ).map((feature) => {
              const isComingSoon = feature.name?.includes("coming soon");

              const iconColor = match({
                isEnterpriseTier,
                isRecommendedTier,
                isComingSoon,
              })
                .with(
                  { isComingSoon: true, isEnterpriseTier: false },
                  () => "text-yellow-500",
                )
                .with(
                  { isRecommendedTier: true },
                  () => "text-[var(--colors-brand-primary)]",
                )
                .otherwise(() => "text-foreground-subtle");

              const FeatureIcon = isComingSoon ? LuClockAlert : LuCheck;

              return (
                <div key={feature.name} className="flex gap-2">
                  <span className="flex h-6 items-center">
                    <FeatureIcon className={cn("size-4", iconColor)} />
                  </span>

                  {feature.name?.split(" (coming soon)")[0]}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PricingCard;

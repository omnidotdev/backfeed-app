import {
  Badge,
  Button,
  Card,
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
  css,
  sigil,
} from "@omnidev/sigil";
import { useMutation } from "@tanstack/react-query";
import {
  Link,
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { useState } from "react";
import { HiLockOpen, HiSparkles } from "react-icons/hi2";
import { LuBuilding, LuCheck, LuClockAlert, LuPlus } from "react-icons/lu";
import { match } from "ts-pattern";

import CreateWorkspaceModal from "@/components/pricing/CreateWorkspaceModal";
import signIn from "@/lib/auth/signIn";
import app from "@/lib/config/app.config";
import { BASE_URL, isSelfHosted } from "@/lib/config/env.config";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";
import { Tier } from "@/lib/types/tier";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";
import { FREE_PRODUCT_DETAILS, sortBenefits } from "@/lib/util/pricing";
import { createCheckoutWithWorkspace } from "@/server/functions/subscriptions";

import type { CardProps } from "@omnidev/sigil";
import type { Subscription } from "@/lib/providers/billing";
import type { ExpandedProductPrice } from "@/server/functions/prices";

interface Props extends CardProps {
  /** Price information. */
  price: ExpandedProductPrice | undefined;
  /** Subscription status for each organization. */
  orgSubscriptions?: Record<string, Subscription | null>;
}

/**
 * Pricing card. Provides pricing information and benefits attached to a product.
 */
const PricingCard = ({ price, orgSubscriptions = {}, ...rest }: Props) => {
  const { session } = useRouteContext({ from: "/pricing" });
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { tier?: string };
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const { setIsOpen: setCreateWorkspaceOpen } = useDialogStore({
    type: DialogType.CreateWorkspace,
  });

  const isPerMonthPricing = price?.recurring?.interval === "month";

  const tier = (price?.metadata.tier as Tier) ?? Tier.Free;

  const isFreeTier = tier === Tier.Free;
  const isBasicTier = tier === Tier.Basic;
  const isTeamTier = tier === Tier.Team;
  const isRecommendedTier = isTeamTier;
  const isEnterpriseTier = tier === Tier.Enterprise;

  const actionIcon = match(tier)
    .with(Tier.Team, () => HiSparkles)
    .with(Tier.Basic, () => HiLockOpen)
    .otherwise(() => undefined);

  // Helper to get tier from subscription
  const getOrgTier = (orgId: string): string => {
    const subscription = orgSubscriptions[orgId];
    if (!subscription) return "free";
    // Product name is like "Backfeed Basic" or "Backfeed Team"
    const productName = subscription.product?.name?.toLowerCase() ?? "";
    if (productName.includes("team")) return "team";
    if (productName.includes("basic")) return "basic";
    return "free";
  };

  // Filter organizations that can upgrade to this tier
  const upgradeableOrgs =
    session?.organizations?.filter((org) => {
      const orgTier = getOrgTier(org.id);
      // Free tier card: no upgrades shown (use "Get Started" flow)
      if (isFreeTier) return false;
      // Enterprise tier: not available yet
      if (isEnterpriseTier) return false;
      // Basic tier card: only show free orgs
      if (isBasicTier) return orgTier === "free";
      // Team tier card: show free and basic orgs
      if (isTeamTier) return orgTier === "free" || orgTier === "basic";
      return false;
    }) ?? [];

  // Check if this card's tier matches the URL param (for post-sign-in auto-open)
  const shouldAutoOpen = search.tier === tier && !!session;

  const { mutateAsync: initiateCheckout } = useMutation({
    mutationFn: async (params: {
      workspaceId?: string;
      createWorkspace?: { name: string; slug: string };
    }) => {
      if (!price?.id) throw new Error("Price ID required");
      setIsCheckoutLoading(true);
      return createCheckoutWithWorkspace({
        data: {
          priceId: price.id,
          successUrl: `${BASE_URL}/workspaces/__SLUG__/settings`,
          cancelUrl: `${BASE_URL}/pricing`,
          ...params,
        },
      });
    },
    onSuccess: (result) => {
      // Redirect to Stripe checkout
      window.location.href = result.checkoutUrl;
    },
    onError: () => {
      setIsCheckoutLoading(false);
    },
  });

  // Handle workspace selection from dropdown
  const handleWorkspaceSelect = (workspaceId: string) => {
    if (workspaceId === "create-new") {
      setCreateWorkspaceOpen(true);
    } else {
      initiateCheckout({ workspaceId });
    }
  };

  // Handle new workspace creation from modal
  const handleCreateWorkspace = (name: string, slug: string) => {
    setCreateWorkspaceOpen(false);
    initiateCheckout({ createWorkspace: { name, slug } });
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
          to: "/workspaces/$workspaceSlug",
          params: { workspaceSlug: firstOrg.slug },
        });
      }
      return;
    }

    // Self-hosted mode - no billing, just go to workspaces
    if (isSelfHosted) {
      navigate({ to: "/workspaces" });
      return;
    }

    // Paid tier without orgs - open create workspace modal
    if (!session.organizations?.length) {
      setCreateWorkspaceOpen(true);
      return;
    }

    // Has orgs - dropdown handles the rest (menu opens automatically)
  };

  // Show dropdown if authenticated, has upgradeable orgs or can create new, paid tier, SaaS
  const showDropdown =
    !!session &&
    !isFreeTier &&
    !isEnterpriseTier &&
    !isSelfHosted &&
    !!session.organizations?.length;

  const buttonContent = isFreeTier
    ? "Get Started"
    : isEnterpriseTier
      ? app.pricingPage.pricingCard.enterprise
      : `Continue with ${capitalizeFirstLetter(tier)}`;

  const buttonClassName = isRecommendedTier
    ? "bg-primary text-primary-foreground hover:bg-primary/90"
    : "border-primary text-primary hover:bg-primary/10";

  return (
    <>
      <Card
        gap={4}
        w="full"
        maxW={{ base: "2xl", xl: "xs" }}
        h={{ xl: "2xl" }}
        outline={isRecommendedTier ? "solid 2px" : undefined}
        outlineColor="brand.primary"
        outlineOffset={1.5}
        bodyProps={{
          p: 0,
        }}
        boxShadow="card"
        {...rest}
      >
        {isRecommendedTier && (
          <Stack
            position="absolute"
            top={1}
            left="50%"
            transform="translateX(-50%)"
            backgroundColor="background.secondary"
            p={2}
            borderRadius={1}
          >
            <Badge color="brand.primary" height={8} borderRadius={4}>
              {app.pricingPage.pricingTiers.recommended}
            </Badge>
          </Stack>
        )}

        {isFreeTier && (
          <Stack
            position="absolute"
            top={1}
            left="50%"
            transform="translateX(-50%)"
            backgroundColor="background.secondary"
            p={2}
            borderRadius={1}
          >
            <Badge color="brand.secondary" height={8} borderRadius={4}>
              No Credit Card Required
            </Badge>
          </Stack>
        )}

        {isEnterpriseTier && (
          <Stack
            position="absolute"
            top={1}
            left="50%"
            transform="translateX(-50%)"
            p={2}
            borderRadius={1}
          >
            <Badge height={8} borderRadius={4}>
              {app.pricingPage.pricingTiers.comingSoon}
            </Badge>
          </Stack>
        )}

        <Stack align="center" h="full" w="full">
          <Stack align="center" w="full" px={6}>
            <Text as="h2" fontSize="2xl" fontWeight="bold" textAlign="center">
              {capitalizeFirstLetter(tier)}
            </Text>

            <Text textAlign="center" color="foreground.subtle">
              {price?.product.description ?? FREE_PRODUCT_DETAILS.description}
            </Text>

            <HStack display="inline-flex" alignItems="center">
              <Text as="h3" fontSize="4xl" fontWeight="bold">
                {!isEnterpriseTier && <sigil.sup fontSize="lg">$</sigil.sup>}

                {price ? price.unit_amount! / 100 : 0}
              </Text>

              {!isEnterpriseTier && (
                <sigil.span
                  fontSize="lg"
                  mt={2}
                  css={css.raw({ ml: -1.5 })}
                  color="foreground.subtle"
                >
                  {!isFreeTier &&
                    (isPerMonthPricing
                      ? `/org/${app.pricingPage.pricingCard.month}`
                      : `/org/${app.pricingPage.pricingCard.year}`)}
                  {isFreeTier && "/forever"}
                </sigil.span>
              )}
            </HStack>

            {showDropdown ? (
              <Menu
                defaultOpen={shouldAutoOpen}
                onSelect={({ value }) => handleWorkspaceSelect(value)}
                trigger={
                  <Button
                    w="100%"
                    fontSize="lg"
                    variant={isRecommendedTier ? "solid" : "outline"}
                    className={buttonClassName}
                    disabled={isCheckoutLoading}
                  >
                    {actionIcon && <Icon src={actionIcon} h={4} w={4} />}
                    {isCheckoutLoading ? "Loading..." : buttonContent}
                  </Button>
                }
                positioning={{ sameWidth: true }}
              >
                {upgradeableOrgs.length > 0 && (
                  <>
                    <MenuItemGroup>
                      <MenuItemGroupLabel color="foreground.subtle">
                        Upgrade existing workspace
                      </MenuItemGroupLabel>

                      {upgradeableOrgs.map((org) => (
                        <MenuItem key={org.id} value={org.id} cursor="pointer">
                          <HStack w="full" gap={2}>
                            <Icon
                              src={LuBuilding}
                              h={4}
                              w={4}
                              color="foreground.subtle"
                            />
                            <Text
                              flex={1}
                              truncate
                              fontWeight="medium"
                              fontSize="sm"
                            >
                              {org.name}
                            </Text>
                          </HStack>
                        </MenuItem>
                      ))}
                    </MenuItemGroup>

                    <MenuSeparator />
                  </>
                )}

                <MenuItemGroup>
                  <MenuItemGroupLabel color="foreground.subtle">
                    Create new workspace
                  </MenuItemGroupLabel>

                  <MenuItem value="create-new" cursor="pointer">
                    <HStack w="full" gap={2}>
                      <Icon
                        src={LuPlus}
                        h={4}
                        w={4}
                        color="foreground.subtle"
                      />
                      <Text fontWeight="medium" fontSize="sm">
                        New workspace
                      </Text>
                    </HStack>
                  </MenuItem>
                </MenuItemGroup>
              </Menu>
            ) : session?.user ? (
              // Logged in but not showing dropdown (free tier or self-hosted)
              isFreeTier ? (
                session.organizations?.length ? (
                  <Button
                    w="100%"
                    fontSize="lg"
                    variant={isRecommendedTier ? "solid" : "outline"}
                    className={buttonClassName}
                    asChild
                  >
                    <Link
                      to="/workspaces/$workspaceSlug"
                      params={{ workspaceSlug: session.organizations[0].slug }}
                    >
                      Go to Workspace
                    </Link>
                  </Button>
                ) : (
                  <Button
                    w="100%"
                    fontSize="lg"
                    variant={isRecommendedTier ? "solid" : "outline"}
                    className={buttonClassName}
                    asChild
                  >
                    <Link to="/workspaces">Go to Workspaces</Link>
                  </Button>
                )
              ) : isEnterpriseTier ? (
                <Button
                  w="100%"
                  fontSize="lg"
                  variant={isRecommendedTier ? "solid" : "outline"}
                  className={buttonClassName}
                  disabled
                >
                  {app.pricingPage.pricingCard.enterprise}
                </Button>
              ) : (
                <Button
                  w="100%"
                  fontSize="lg"
                  variant={isRecommendedTier ? "solid" : "outline"}
                  className={buttonClassName}
                  onClick={handleClick}
                  disabled={isCheckoutLoading}
                >
                  {actionIcon && <Icon src={actionIcon} h={4} w={4} />}
                  {isCheckoutLoading ? "Loading..." : buttonContent}
                </Button>
              )
            ) : (
              // Not logged in
              <Button
                w="100%"
                fontSize="lg"
                disabled={isEnterpriseTier}
                variant={isRecommendedTier ? "solid" : "outline"}
                className={buttonClassName}
                onClick={() =>
                  signIn({
                    redirectUrl: `${BASE_URL}/pricing?tier=${tier}`,
                    action: "sign-up",
                  })
                }
              >
                {actionIcon && <Icon src={actionIcon} h={4} w={4} />}

                {isEnterpriseTier
                  ? app.pricingPage.pricingCard.enterprise
                  : app.pricingPage.pricingCard.getStarted}
              </Button>
            )}
          </Stack>

          <Stack
            w="full"
            h="full"
            bgColor={{
              base: "background.subtle",
              _dark: "background.subtle/25",
            }}
            p={6}
          >
            <Grid w="full" columns={{ base: 1, sm: 2, lg: 1 }} lineHeight={1.5}>
              {sortBenefits(
                price?.product.marketing_features ??
                  FREE_PRODUCT_DETAILS.marketing_features,
              ).map((feature) => {
                const isComingSoon = feature.name?.includes("coming soon");

                const color = match({
                  isEnterpriseTier,
                  isRecommendedTier,
                  isComingSoon,
                })
                  .with(
                    { isComingSoon: true, isEnterpriseTier: false },
                    () => "yellow",
                  )
                  .with({ isRecommendedTier: true }, () => "brand.primary")
                  .otherwise(() => "foreground.subtle");

                return (
                  <GridItem key={feature.name} display="flex" gap={2}>
                    <sigil.span h={6} display="flex" alignItems="center">
                      <Icon
                        src={isComingSoon ? LuClockAlert : LuCheck}
                        h={4}
                        w={4}
                        color={color}
                      />
                    </sigil.span>

                    {feature.name?.split(" (coming soon)")[0]}
                  </GridItem>
                );
              })}
            </Grid>
          </Stack>
        </Stack>
      </Card>

      {/* Modal for creating new workspace */}
      <CreateWorkspaceModal
        tierName={capitalizeFirstLetter(tier) ?? tier}
        onSubmit={handleCreateWorkspace}
        isLoading={isCheckoutLoading}
      />
    </>
  );
};

export default PricingCard;

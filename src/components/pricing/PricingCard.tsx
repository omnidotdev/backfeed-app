import {
  Badge,
  Button,
  Card,
  Grid,
  GridItem,
  HStack,
  Icon,
  Stack,
  Text,
  css,
  sigil,
} from "@omnidev/sigil";
import { useRouteContext } from "@tanstack/react-router";
import { HiLockOpen, HiSparkles } from "react-icons/hi2";
import { LuCheck, LuClockAlert } from "react-icons/lu";
import { match } from "ts-pattern";

import TierCallToAction from "@/components/pricing/TierCallToAction";
import { Tier } from "@/generated/graphql";
import { signIn } from "@/lib/auth/signIn";
import app from "@/lib/config/app.config";
import { BASE_URL } from "@/lib/config/env.config";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";

import type { CardProps } from "@omnidev/sigil";
import type Stripe from "stripe";
import type { ExpandedProductPrice } from "@/server/functions/prices";

// TODO discuss pulling dynamically + cache from Omni API or other approaches that make this changeable without redeploying service
export const FREE_PRODUCT_DETAILS = {
  description: "Start collecting and iterating on user feedback for free",
  marketing_features: [
    { name: "1 project per organization" },
    { name: "Feedback from up to 15 unique users per project" },
    { name: "Community support" },
    { name: "Community voting & discussions" },
  ],
};

export const sortBenefits = (benefits: Stripe.Product.MarketingFeature[]) => {
  const everythingInPrefix = "Everything in";
  let everythingInBenefit: Stripe.Product.MarketingFeature | undefined;
  const otherBenefits: Stripe.Product.MarketingFeature[] = [];

  // Separate "Everything in..." benefit and other benefits
  for (const benefit of benefits) {
    if (benefit.name?.startsWith(everythingInPrefix)) {
      everythingInBenefit = benefit;
    } else {
      otherBenefits.push(benefit);
    }
  }

  // Construct the new array with "Everything in..." at the front (if present)
  if (everythingInBenefit) {
    return [everythingInBenefit, ...otherBenefits];
  }

  return otherBenefits;
};

interface Props extends CardProps {
  /** Price information. */
  price: ExpandedProductPrice | undefined;
}

/**
 * Pricing card. Provides pricing information and benefits attached to a product.
 */
const PricingCard = ({ price, ...rest }: Props) => {
  const { session } = useRouteContext({ from: "/pricing" });

  const isPerMonthPricing = price?.recurring?.interval === "month";

  const tier = (price?.metadata.tier as Tier) ?? Tier.Free;

  const isFreeTier = tier === Tier.Free;
  const isRecommendedTier = tier === Tier.Team;
  // TODO: determine if we want to display / handle Enterprise tier
  const isEnterpriseTier = false;

  const actionIcon = match(tier)
    .with(Tier.Team, () => HiSparkles)
    .with(Tier.Basic, () => HiLockOpen)
    .otherwise(() => undefined);

  return (
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
            No Subscription Required
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
          {/* ! NB: important to add a `title` key to product metadata */}
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

          {session?.user ? (
            <TierCallToAction
              w="100%"
              fontSize="lg"
              variant={isRecommendedTier ? "solid" : "outline"}
              disabled={isEnterpriseTier}
              priceId={price?.id ?? ""}
              tier={tier}
              actionIcon={actionIcon}
            />
          ) : (
            <Button
              w="100%"
              fontSize="lg"
              disabled={isEnterpriseTier}
              variant={isRecommendedTier ? "solid" : "outline"}
              onClick={() => signIn({ redirectUrl: `${BASE_URL}/pricing` })}
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
                  {/* ! NB: height should match the line height of the item (set at the `Grid` level). CSS has a modern `lh` unit, but that seemingly does not work, so this is a workaround. */}
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
  );
};

export default PricingCard;

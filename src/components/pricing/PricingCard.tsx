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
import signIn from "@/lib/auth/signIn";
import app from "@/lib/config/app.config";
import { BASE_URL } from "@/lib/config/env.config";
import { Tier } from "@/lib/types/tier";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";
import { FREE_PRODUCT_DETAILS, sortBenefits } from "@/lib/util/pricing";

import type { CardProps } from "@omnidev/sigil";
import type { ExpandedProductPrice } from "@/server/functions/prices";

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
              className={
                isRecommendedTier
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border-primary text-primary hover:bg-primary/10"
              }
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

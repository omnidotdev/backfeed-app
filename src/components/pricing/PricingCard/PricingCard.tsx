"use client";

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
import { SubscriptionRecurringInterval } from "@polar-sh/sdk/models/components/subscriptionrecurringinterval";
import { signIn } from "next-auth/react";
import { LuCheck, LuClockAlert } from "react-icons/lu";
import { match } from "ts-pattern";

import { TierCallToAction } from "components/pricing";
import { app } from "lib/config";
import { useProductMetadata, useSearchParams } from "lib/hooks";

import type { CardProps } from "@omnidev/sigil";
import type { Benefit } from "@polar-sh/sdk/models/components/benefit";
import type { BenefitCustomProperties } from "@polar-sh/sdk/models/components/benefitcustomproperties";
import type { Product } from "@polar-sh/sdk/models/components/product";
import type { ProductPrice } from "@polar-sh/sdk/models/components/productprice";
import type { CustomerState } from "components/profile/Subscription/Subscriptions";
import type { Session } from "next-auth";

const COMING_SOON = "coming soon";

/**
 * Get a human-readable price.
 * @param price Fixed price details. Derived from product.
 * @param isEnterpriseTier Whether the product is enterprise tier.
 * @returns A human-readable price.
 */
const getPrice = (price: ProductPrice, isEnterpriseTier: boolean) => {
  if (price.amountType !== "fixed" || isEnterpriseTier)
    return price.amountType === "free"
      ? 0
      : app.pricingPage.pricingCard.customPricing;

  return price.priceAmount / 100;
};

export const sortBenefits = (benefits: Benefit[]) => {
  const everythingInPrefix = "Everything in";
  let everythingInBenefit: Benefit | undefined;
  const otherBenefits: Benefit[] = [];

  // Separate "Everything in..." benefit and other benefits
  for (const benefit of benefits) {
    if (benefit.description.startsWith(everythingInPrefix)) {
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
  /** Signed in user */
  user: Session["user"] | undefined;
  /** Product information. */
  product: Product;
  /** Customer details */
  customer?: CustomerState;
}

/**
 * Pricing card. Provides pricing information and benefits attached to a product.
 */
const PricingCard = ({ user, product, customer, ...rest }: Props) => {
  const [{ pricingModel }] = useSearchParams();

  const isPerMonthPricing =
    pricingModel === SubscriptionRecurringInterval.Month;

  const {
    productTitle,
    tier,
    isFreeTier,
    isRecommendedTier,
    isEnterpriseTier,
    isDisabled,
    actionIcon,
  } = useProductMetadata({ product });

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
            No Credit Card Required
          </Badge>
        </Stack>
      )}

      {isDisabled && (
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
            {productTitle}
          </Text>

          <Text textAlign="center" color="foreground.subtle">
            {product.description}
          </Text>

          <HStack display="inline-flex" alignItems="center">
            <Text as="h3" fontSize="4xl" fontWeight="bold">
              {!isEnterpriseTier && <sigil.sup fontSize="lg">$</sigil.sup>}

              {getPrice(product.prices[0] as ProductPrice, isEnterpriseTier)}
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

          {user ? (
            <TierCallToAction
              w="100%"
              fontSize="lg"
              variant={isRecommendedTier ? "solid" : "outline"}
              disabled={isDisabled}
              user={user}
              productId={product.id}
              tier={tier}
              actionIcon={actionIcon}
              customer={customer}
            />
          ) : (
            <Button
              w="100%"
              fontSize="lg"
              disabled={isDisabled}
              variant={isRecommendedTier ? "solid" : "outline"}
              onClick={() => signIn("omni")}
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
            {sortBenefits(product.benefits).map((feature) => {
              const isComingSoon = (
                feature.properties as BenefitCustomProperties
              ).note
                ?.toLowerCase()
                .includes(COMING_SOON);

              const color = match({
                isDisabled,
                isRecommendedTier,
                isComingSoon,
              })
                .with({ isDisabled: true }, () => "foreground.subtle")
                .with({ isComingSoon: true }, () => "yellow")
                .with({ isRecommendedTier: true }, () => "brand.primary")
                .otherwise(() => "foreground.subtle");

              return (
                <GridItem key={feature.id} display="flex" gap={2}>
                  {/* ! NB: height should match the line height of the item (set at the `Grid` level). CSS has a modern `lh` unit, but that seemingly does not work, so this is a workaround. */}
                  <sigil.span h={6} display="flex" alignItems="center">
                    <Icon
                      src={isComingSoon ? LuClockAlert : LuCheck}
                      h={4}
                      w={4}
                      color={color}
                    />
                  </sigil.span>

                  {feature.description}
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

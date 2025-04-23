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
import { useRouter } from "next/navigation";
import { LuCheck, LuClockAlert } from "react-icons/lu";
import { match } from "ts-pattern";

import { app } from "lib/config";
import { useAuth, useProductMetadata, useSearchParams } from "lib/hooks";

import type { CardProps } from "@omnidev/sigil";
import type { BenefitCustomProperties } from "@polar-sh/sdk/models/components/benefitcustomproperties";
import type { Product } from "@polar-sh/sdk/models/components/product";
import type { ProductPrice } from "@polar-sh/sdk/models/components/productprice";

const COMING_SOON = "coming soon";

/**
 * Get a human-readable price.
 * @param price Fixed price details. Derived from product.
 * @param isEnterpriseTier Whether the product is enterprise tier.
 * @returns A human-readable price.
 */
const getPrice = (price: ProductPrice, isEnterpriseTier: boolean) => {
  if (price.amountType !== "fixed" || isEnterpriseTier)
    return app.pricingPage.pricingCard.customPricing;

  return price.priceAmount / 100;
};

interface Props extends CardProps {
  /** Product information. */
  product: Product;
}

/**
 * Pricing card. Provides pricing information and benefits attached to a product.
 */
const PricingCard = ({ product, ...rest }: Props) => {
  const router = useRouter();

  const { isAuthenticated, user } = useAuth();

  const [{ pricingModel }] = useSearchParams();

  const isPerMonthPricing =
    pricingModel === SubscriptionRecurringInterval.Month;

  const {
    productTitle,
    isRecommendedTier,
    isEnterpriseTier,
    isDisabled,
    actionIcon,
  } = useProductMetadata({ product });

  return (
    <Card
      gap={4}
      w="full"
      maxW={{ base: "2xl", lg: "xs" }}
      h={{ lg: "2xl" }}
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
                /{app.pricingPage.pricingCard.user}/
                {isPerMonthPricing
                  ? app.pricingPage.pricingCard.month
                  : app.pricingPage.pricingCard.year}
              </sigil.span>
            )}
          </HStack>

          <Button
            w="100%"
            fontSize="lg"
            disabled={isDisabled}
            variant={isRecommendedTier ? "solid" : "outline"}
            onClick={() =>
              isAuthenticated
                ? router.push(
                    `/api/customer/checkout?productId=${product.id}&customerExternalId=${user?.hidraId}`,
                  )
                : signIn("omni")
            }
          >
            {actionIcon && <Icon src={actionIcon} h={4} w={4} />}

            {isEnterpriseTier
              ? app.pricingPage.pricingCard.enterprise
              : app.pricingPage.pricingCard.getStarted}
          </Button>
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
            {product.benefits.map((feature) => {
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

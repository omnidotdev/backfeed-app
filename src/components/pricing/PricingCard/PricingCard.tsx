"use client";

import {
  Badge,
  Box,
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
import { HiLockOpen, HiSparkles } from "react-icons/hi2";
import { match } from "ts-pattern";

import { app } from "lib/config";
import { useAuth, useSearchParams } from "lib/hooks";

import type { CardProps } from "@omnidev/sigil";
import type { Product } from "@polar-sh/sdk/models/components/product";
import type { ProductPrice } from "@polar-sh/sdk/models/components/productprice";

/**
 * Get a human-readable price.
 * @param price Fixed price details. Derived from product.
 * @param isEnterprise Whether the product is enterprise tier.
 * @returns A human-readable price.
 */
const getPrice = (price: ProductPrice, isEnterprise: boolean) => {
  if (price.amountType !== "fixed" || isEnterprise) return "Custom";

  return `$${price.priceAmount / 100}`;
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

  // ! NB: these metadata properties are typically optional and must be present for the corresponding product
  const isRecommendedTier = !!product.metadata.isRecommended;
  const isDisabled = !!product.metadata.isDisabled;
  const isEnterprise = !!product.metadata.isEnterprise;

  const icon = match(product.metadata)
    .with({ isRecommended: "true" }, () => HiSparkles)
    .with({ isEnterprise: "true" }, () => undefined)
    .otherwise(() => HiLockOpen);

  return (
    <Card
      gap={4}
      w="full"
      maxW={{ lg: "xs" }}
      h={{ lg: "2xl" }}
      color={isDisabled ? "foreground.subtle" : undefined}
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
          <Text as="h2" fontSize="2xl" fontWeight="bold" textAlign="center">
            {product.name}
          </Text>

          <Text textAlign="center" color="foreground.subtle">
            {product.description}
          </Text>

          <HStack display="inline-flex" alignItems="center">
            <Text as="h3" fontSize="4xl" fontWeight="bold">
              {getPrice(product.prices[0] as ProductPrice, isEnterprise)}
            </Text>

            {!isEnterprise && (
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
                    `/api/customer/checkout?productId=${product.id}&customerExternalId=${user?.rowId}`
                  )
                : signIn("omni")
            }
          >
            {icon && <Icon src={icon} h={4} w={4} />}

            {isEnterprise
              ? app.pricingPage.pricingCard.enterprise
              : app.pricingPage.pricingCard.getStarted}
          </Button>
        </Stack>

        <Stack
          w="full"
          h="full"
          bgColor={{
            base: "background.subtle/70",
            _dark: "background.subtle/20",
          }}
          p={6}
        >
          <Grid w="full" columns={{ base: 1, sm: 2, md: 3, lg: 1 }}>
            {product.benefits.map((feature) => (
              <GridItem
                key={feature.id}
                fontSize="sm"
                display="flex"
                alignItems="center"
                gap={2}
              >
                <Box
                  h={1}
                  w={1}
                  borderRadius="full"
                  bgColor={
                    isRecommendedTier ? "brand.primary" : "foreground.subtle"
                  }
                />
                {feature.description}
              </GridItem>
            ))}
          </Grid>
        </Stack>
      </Stack>
    </Card>
  );
};

export default PricingCard;

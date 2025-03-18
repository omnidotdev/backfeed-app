"use client";

import {
  Badge,
  Button,
  Card,
  Divider,
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
import { FaArrowRight } from "react-icons/fa6";

import { app } from "lib/config";
import { useAuth } from "lib/hooks";

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
  if (price.amountType !== "fixed" || isEnterprise) return "Contact us";

  return `$${price.priceAmount / 100}`;
};

interface Props extends CardProps {
  /** Product information. */
  product: Product;
  /** Pricing model (e.g. monthly or annual). */
  pricingModel: SubscriptionRecurringInterval;
}

/**
 * Pricing card. Provides pricing information and benefits attached to a product.
 */
const PricingCard = ({ product, pricingModel, ...rest }: Props) => {
  const router = useRouter();

  const { isAuthenticated, user } = useAuth();

  const isPerMonthPricing =
    pricingModel === SubscriptionRecurringInterval.Month;

  // ! NB: these metadata properties are typically optional and must be present for the corresponding product
  const isRecommendedTier = !!product.metadata.isRecommended;
  const isDisabled = !!product.metadata.isDisabled;
  const isEnterprise = !!product.metadata.isEnterprise;

  return (
    <Card
      gap={4}
      w={{ base: "100%", sm: "sm", lg: "xs" }}
      minH="2xl"
      display="flex"
      position="relative"
      color={isDisabled ? "foreground.subtle" : undefined}
      borderWidth={isRecommendedTier ? 2 : 1}
      borderColor={isRecommendedTier ? "brand.primary" : "none"}
      footer={
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
          {app.pricingPage.pricingCard.getStarted}{" "}
          <Icon src={FaArrowRight} w={4} />
        </Button>
      }
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

      <Stack
        display="flex"
        flexDirection="column"
        align="center"
        justify="space-between"
        h="full"
      >
        <Stack align="center" w="full">
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

          <Divider my={2} />

          <sigil.ul
            // TODO: fix styles not appropriately being applied, See: https://linear.app/omnidev/issue/OMNI-109/look-into-panda-css-styling-issues
            css={css.raw({
              w: "full",
              listStyle: "disc",
              ml: 8,
              px: 2,
            })}
          >
            {product.benefits.map((feature) => (
              <sigil.li key={feature.id} fontSize="sm">
                {feature.description}
              </sigil.li>
            ))}
          </sigil.ul>
        </Stack>
      </Stack>
    </Card>
  );
};

export default PricingCard;

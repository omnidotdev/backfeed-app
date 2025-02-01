"use client";

import {
  Badge,
  Card,
  Divider,
  HStack,
  Stack,
  Text,
  sigil,
} from "@omnidev/sigil";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import { PricingCardAction } from "components/pricing";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

import type { ButtonProps, CardProps } from "@omnidev/sigil";
import type { Product } from "@polar-sh/sdk/models/components/product";
import type { ProductPriceOneTimeFixed } from "@polar-sh/sdk/models/components/productpriceonetimefixed";

interface Props extends CardProps {
  /** Product the pricing tier is for. */
  product: Product;
  /** Whether the tier is recommended. */
  isRecommendedTier?: boolean;
  /** Whether the tier uses a monthly pricing model. */
  isPerMonthPricing?: boolean;
  /** CTA button properties. */
  ctaProps?: ButtonProps;
}

/**
 * Pricing tier information.
 */
const PricingCard = ({
  product,
  isRecommendedTier = false,
  isPerMonthPricing = true,
  ctaProps,
  ...rest
}: Props) => {
  const { isAuthenticated } = useAuth();

  const handleCheckout = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment/checkout?productId=${product.id}`
    );

    if (!response.ok) {
      throw new Error("Failed to create checkout");
    }

    const { url } = await response.json();

    window.location.href = url;
  };

  return (
    <Card
      gap={4}
      w={{ base: "100%", sm: "sm", lg: "xs" }}
      h="xl"
      display="flex"
      position="relative"
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

      <Stack display="flex" flexDirection="column" alignItems="center" h="md">
        <Text as="h2" fontSize="3xl" textAlign="center">
          {product.name}
        </Text>

        <HStack display="inline-flex" alignItems="center">
          {/* TODO: handle Enterprise pricing */}
          {/* TODO: determine approach for handling per-month pricing, yearly pricing, etc. */}
          <Text as="h3" fontSize="3xl" fontWeight="bold">
            ${(product.prices[0] as ProductPriceOneTimeFixed).priceAmount / 100}
          </Text>

          {isPerMonthPricing && (
            <Text fontSize="xl" mt={1} ml={-2.5}>
              {app.pricingPage.pricingCard.perMonth}
            </Text>
          )}
        </HStack>

        <Divider my={4} />

        <sigil.ul
          style={{
            listStyle: "disc",
            marginLeft: 2,
          }}
        >
          {product.benefits.map((benefit) => (
            <sigil.li key={benefit.id}>{benefit.description}</sigil.li>
          ))}
        </sigil.ul>

        {isAuthenticated ? (
          <PricingCardAction
            {...ctaProps}
            onClick={() =>
              // No success toast due to external redirect
              toast.promise(handleCheckout, {
                loading: "Starting checkout...",
                error: "Failed to load checkout. Please try again.",
              })
            }
          />
        ) : (
          <PricingCardAction {...ctaProps} onClick={() => signIn("omni")} />
        )}
      </Stack>
    </Card>
  );
};

export default PricingCard;

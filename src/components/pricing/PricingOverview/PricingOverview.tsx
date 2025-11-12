"use client";

import {
  Flex,
  Stack,
  Text,
  ToggleGroup,
  ToggleGroupItem,
} from "@omnidev/sigil";
import { SubscriptionRecurringInterval } from "@polar-sh/sdk/models/components/subscriptionrecurringinterval";
import { useMemo } from "react";

import {
  PricingCard,
  PricingFAQ,
  PricingHeader,
  PricingMatrix,
} from "components/pricing";
import { app } from "lib/config";
import { useSearchParams } from "lib/hooks";

import type { Product } from "@polar-sh/sdk/models/components/product";
import type { Session } from "next-auth";

interface Props {
  /** Signed in user */
  user: Session["user"] | undefined;
  /** The products available for pricing tiers. */
  products: Product[];
}

/**
 * Pricing overview section.
 */
const PricingOverview = ({ user, products }: Props) => {
  const [{ pricingModel }, setSearchParams] = useSearchParams();

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.recurringInterval === pricingModel ||
          product.prices[0].amountType === "free",
      ),
    [products, pricingModel],
  );

  return (
    <Stack px={0} align="center">
      <PricingHeader />

      {/* pricing model toggle */}
      <Flex position="relative" mb={4}>
        <ToggleGroup
          borderRadius="full"
          borderColor="border.default"
          position="relative"
          mb={2}
          value={[pricingModel]}
          onValueChange={({ value }) =>
            // NB: length check prevents deselecting a selected value
            value.length &&
            setSearchParams({
              pricingModel: (value[0] as SubscriptionRecurringInterval) ?? null,
            })
          }
        >
          <ToggleGroupItem
            value={SubscriptionRecurringInterval.Month}
            color="foreground.default"
            px={6}
            py={4}
            flex={1}
            transition="none"
            _on={{
              bgColor: "brand.primary",
              color: "background.default",
            }}
          >
            {app.pricingPage.pricingHeader.monthly}
          </ToggleGroupItem>

          <ToggleGroupItem
            value={SubscriptionRecurringInterval.Year}
            color="foreground.default"
            px={6}
            py={4}
            flex={1}
            transition="none"
            _on={{
              bgColor: "brand.primary",
              color: "background.default",
            }}
          >
            {app.pricingPage.pricingHeader.annual}
          </ToggleGroupItem>
        </ToggleGroup>

        <Text
          position="absolute"
          right={-2}
          top={-2}
          rotate="10deg"
          fontSize="xs"
          fontWeight="semibold"
          bgColor="brand.tertiary"
          color="background.default"
          px={2}
          borderRadius="sm"
          boxShadow="sm"
        >
          {app.pricingPage.pricingHeader.savings}
        </Text>
      </Flex>

      <Flex
        w="full"
        direction={{ base: "column", xl: "row" }}
        align="center"
        justify="center"
        gap={4}
        px={4}
      >
        {filteredProducts.map((product) => (
          <PricingCard key={product.id} user={user} product={product} />
        ))}
      </Flex>

      <PricingMatrix maxW="5xl" alignSelf="center" my={6} />

      <PricingFAQ w="100%" maxW="5xl" alignSelf="center" mb={6} px={4} />
    </Stack>
  );
};

export default PricingOverview;

"use client";

import {
  Flex,
  Stack,
  Text,
  ToggleGroup,
  ToggleGroupItem,
} from "@omnidev/sigil";
import { useMemo } from "react";

import {
  PricingCard,
  PricingFAQ,
  PricingHeader,
  PricingMatrix,
} from "components/pricing";
import { app } from "lib/config";
import { useSearchParams } from "lib/hooks";

import type { CustomerState } from "components/profile/UserOrganizations/UserOrganizations";
import type { AuthUser } from "lib/util";
import type Stripe from "stripe";

export interface Price extends Stripe.Price {
  product: Stripe.Product;
}

interface Props {
  /** Authenticated user. */
  user: AuthUser | undefined;
  /** The available pricing tiers. */
  prices: Price[];
  /** Customer details. */
  customer?: CustomerState;
}

/**
 * Pricing overview section.
 */
const PricingOverview = ({ user, prices, customer }: Props) => {
  const [{ pricingModel }, setSearchParams] = useSearchParams();

  const filteredPrices = useMemo(
    () => prices.filter((price) => price.recurring?.interval === pricingModel),
    [prices, pricingModel],
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
              pricingModel: (value[0] as "month" | "year") ?? null,
            })
          }
        >
          <ToggleGroupItem
            value="month"
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
            value="year"
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
        <PricingCard user={user} price={undefined} customer={customer} />

        {filteredPrices.map((price) => (
          <PricingCard
            key={price.id}
            user={user}
            price={price}
            customer={customer}
          />
        ))}
      </Flex>

      <PricingMatrix maxW="5xl" alignSelf="center" my={6} />

      <PricingFAQ w="100%" maxW="5xl" alignSelf="center" mb={6} px={4} />
    </Stack>
  );
};

export default PricingOverview;

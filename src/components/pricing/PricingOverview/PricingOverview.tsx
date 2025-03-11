"use client";

import {
  Flex,
  HStack,
  Stack,
  Text,
  ToggleGroup,
  ToggleGroupItem,
} from "@omnidev/sigil";
import { SubscriptionRecurringInterval } from "@polar-sh/sdk/models/components/subscriptionrecurringinterval";
import { signIn } from "next-auth/react";
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

interface Props {
  products: Product[];
}

/**
 * Pricing overview section.
 */
const PricingOverview = ({ products }: Props) => {
  const [{ pricingModel }, setSearchParams] = useSearchParams();

  // TODO: use `filteredProducts` to populate the pricing cards (and pricing matrix?)
  const filteredProducts = useMemo(
    () =>
      products.filter((product) => product.recurringInterval === pricingModel),
    [products, pricingModel]
  );

  return (
    <Stack px={0} align="center">
      <PricingHeader />

      {/* pricing model toggle */}
      <Flex position="relative">
        <ToggleGroup
          borderRadius="full"
          position="relative"
          mb={2}
          value={[pricingModel]}
          onValueChange={({ value }) =>
            setSearchParams({
              pricingModel: (value[0] as SubscriptionRecurringInterval) ?? null,
            })
          }
        >
          <ToggleGroupItem
            value={SubscriptionRecurringInterval.Month}
            px={6}
            py={4}
            w="50%"
            _on={{
              bgColor: "brand.primary",
              color: "background.default",
            }}
          >
            {app.pricingPage.pricingHeader.monthly}
          </ToggleGroupItem>

          <ToggleGroupItem
            value={SubscriptionRecurringInterval.Year}
            px={6}
            py={4}
            w="50%"
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

      <HStack flexWrap="wrap" justify="center" gap={4} px={4}>
        {app.pricingPage.pricingTiers.tiers.map((tier) => {
          const isTeamTier = tier.title.includes("Team");
          const isEnterpriseTier = tier.title.includes("Enterprise");

          return (
            <PricingCard
              key={tier.title}
              tier={tier}
              isRecommendedTier={isTeamTier}
              isDisabled={isEnterpriseTier}
              pricingModel={pricingModel}
              borderWidth={isTeamTier ? 2 : 1}
              borderColor={isTeamTier ? "brand.primary" : "none"}
              ctaProps={{
                // TODO: update. Remove callbackUrl so it routes back to pricing after redirect on pricing page is removed and "Get Started" functionality is implemented
                onClick: () => signIn("omni", { callbackUrl: "/" }),
              }}
            />
          );
        })}
      </HStack>

      <PricingMatrix maxW="5xl" alignSelf="center" my={6} />

      <PricingFAQ w="100%" maxW="5xl" alignSelf="center" mb={6} px={4} />
    </Stack>
  );
};

export default PricingOverview;

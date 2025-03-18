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
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import {
  PricingCard,
  PricingFAQ,
  PricingHeader,
  PricingMatrix,
} from "components/pricing";
import { app } from "lib/config";
import { useAuth, useSearchParams } from "lib/hooks";

import type { Product } from "@polar-sh/sdk/models/components/product";

// ! NB: Ordered tiers for sorting products. If the order is adjusted in the config, this must be updated.
const orderedTiers = app.pricingPage.pricingTiers.tiers.map(
  (tier) => tier.title
);

/**
 * Custom sorting function for products based on their tier.
 */
const sortByTier = (a: Product, b: Product) => {
  const indexA = orderedTiers.indexOf(a.name);
  const indexB = orderedTiers.indexOf(b.name);
  return indexA - indexB;
};

interface Props {
  /** The products available for pricing tiers. */
  products: Product[];
}

/**
 * Pricing overview section.
 */
const PricingOverview = ({ products }: Props) => {
  const router = useRouter();

  const [{ pricingModel }, setSearchParams] = useSearchParams();

  const { isAuthenticated, user } = useAuth();

  const filteredProducts = useMemo(
    () =>
      products
        .filter((product) => product.recurringInterval === pricingModel)
        .sort(sortByTier),
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
            // NB: length check prevents deselecting a selected value
            value.length &&
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
        {filteredProducts.map((product) => {
          const tier = app.pricingPage.pricingTiers.tiers.find(
            (tier) => tier.title === product.name
          );

          const isTeamTier = tier?.title.includes("Team");
          const isEnterpriseTier = tier?.title.includes("Enterprise");

          return (
            <PricingCard
              key={product.name}
              tier={tier!}
              isRecommendedTier={isTeamTier}
              isDisabled={isEnterpriseTier}
              pricingModel={pricingModel}
              borderWidth={isTeamTier ? 2 : 1}
              borderColor={isTeamTier ? "brand.primary" : "none"}
              ctaProps={{
                variant: isTeamTier ? "solid" : "outline",
                onClick: () =>
                  isAuthenticated
                    ? router.push(
                      `/api/customer/checkout?productId=${product.id}&customerExternalId=${user?.rowId}`
                    )
                    : signIn("omni"),
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

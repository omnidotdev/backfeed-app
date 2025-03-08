"use client";

import { HStack, Stack, ToggleGroup, ToggleGroupItem } from "@omnidev/sigil";

import {
  PricingCard,
  PricingFAQ,
  PricingHeader,
  PricingMatrix,
} from "components/pricing";
import { app } from "lib/config";
import { useState } from "react";

export type PricingType = "monthly" | "annual";

/**
 * Pricing overview section.
 */
const PricingOverview = () => {
  const [pricingModel, setPricingType] = useState<PricingType>("monthly");

  return (
    <Stack px={{ base: 6, md: 2, lg: 0 }} align="center">
      <PricingHeader />

      <ToggleGroup
        borderRadius="full"
        mb={2}
        value={[pricingModel]}
        onValueChange={({ value }) =>
          // NB: length check prevents deselecting a selected value
          value.length && setPricingType(value[0] as PricingType)
        }
      >
        <ToggleGroupItem
          value="monthly"
          p={4}
          w="50%"
          _on={{
            bgColor: "brand.primary",
            color: "background.default",
          }}
        >
          Monthly
        </ToggleGroupItem>

        <ToggleGroupItem
          value="annual"
          p={4}
          w="50%"
          _on={{
            bgColor: "brand.primary",
            color: "background.default",
          }}
        >
          Annual
        </ToggleGroupItem>
      </ToggleGroup>

      <HStack
        flexWrap="wrap"
        flexDirection={{ base: "column", lg: "row" }}
        justifyContent="center"
        gap={4}
        w="100%"
        mx="auto"
      >
        {app.pricingPage.pricingTiers.tiers.map((tier) => {
          const isTeamTier = tier.title.includes("Team");
          const isEnterpriseTier = tier.title.includes("Enterprise");

          return (
            <PricingCard
              key={tier.title}
              tier={tier}
              borderWidth={isTeamTier ? 2 : 1}
              borderColor={isTeamTier ? "brand.primary" : "none"}
              isRecommendedTier={isTeamTier}
              isDisabled={isEnterpriseTier}
              pricingModel={pricingModel}
            />
          );
        })}
      </HStack>

      <PricingMatrix maxW="5xl" alignSelf="center" mt={6} />

      <PricingFAQ w="100%" maxW="5xl" alignSelf="center" />
    </Stack>
  );
};

export default PricingOverview;

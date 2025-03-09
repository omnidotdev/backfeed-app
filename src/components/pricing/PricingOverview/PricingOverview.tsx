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

export type PricingModel = "monthly" | "annual";

/**
 * Pricing overview section.
 */
const PricingOverview = () => {
  // TODO move to URL state (https://github.com/omnidotdev/backfeed-app/pull/69#discussion_r1986197545)
  const [pricingModel, setPricingModel] = useState<PricingModel>("monthly");

  return (
    <Stack px={{ base: 6, md: 2, lg: 0 }} align="center">
      <PricingHeader />

      {/* pricing model toggle */}
      <ToggleGroup
        borderRadius="full"
        mb={2}
        value={[pricingModel]}
        onValueChange={({ value }) =>
          // NB: length check prevents deselecting a selected value
          value.length && setPricingModel(value[0] as PricingModel)
        }
      >
        <ToggleGroupItem
          value="monthly"
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
          value="annual"
          px={6}
          py={4}
          w="50%"
          _on={{
            bgColor: "brand.primary",
            color: "background.default",
          }}
        >
          {app.pricingPage.pricingHeader.annual} (
          {app.pricingPage.pricingHeader.savings})
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

      <PricingMatrix maxW="5xl" alignSelf="center" my={6} />

      <PricingFAQ w="100%" maxW="5xl" alignSelf="center" />
    </Stack>
  );
};

export default PricingOverview;

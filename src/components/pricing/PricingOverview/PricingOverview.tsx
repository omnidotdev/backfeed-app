"use client";

import { HStack, Stack } from "@omnidev/sigil";

import { PricingCard, PricingFAQ, PricingHeader } from "components/pricing";
import { app } from "lib/config";

/**
 * Pricing overview section.
 */
const PricingOverview = () => (
  <Stack px={{ base: 6, md: 2, lg: 0 }}>
    <PricingHeader />

    <HStack
      flexWrap="wrap"
      flexDirection={{ base: "column", lg: "row" }}
      justifyContent="center"
      gap={4}
      w="100%"
      mx="auto"
    >
      {app.pricingPage.pricingTiers.tiers.map((tier) => {
        const isProfessionalTier = tier.title === "Professional";
        const isEnterpriseTier = tier.title === "Enterprise";

        return (
          <PricingCard
            key={tier.title}
            tier={tier}
            borderWidth={isProfessionalTier ? 4 : 1}
            borderColor={isProfessionalTier ? "brand.primary" : "none"}
            isRecommendedTier={isProfessionalTier}
            perMonthPricing={!isEnterpriseTier}
            ctaProps={{
              bgColor: isProfessionalTier ? "brand.primary" : "brand.secondary",
            }}
          />
        );
      })}
    </HStack>

    <PricingFAQ />
  </Stack>
);

export default PricingOverview;

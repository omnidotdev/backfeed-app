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
      {app.pricingPage.pricingTiers.tiers.map((tier) => (
        <PricingCard key={tier.title} tier={tier} />
      ))}
    </HStack>

    <PricingFAQ />
  </Stack>
);

export default PricingOverview;

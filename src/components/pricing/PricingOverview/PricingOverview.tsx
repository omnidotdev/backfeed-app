"use client";

import { Stack } from "@omnidev/sigil";

import { PricingCard, PricingFAQ, PricingHeader } from "components/pricing";

const PricingOverview = () => (
  <Stack px={{ base: 6, md: 2, lg: 0 }}>
    <PricingHeader />

    <PricingCard />

    <PricingFAQ />
  </Stack>
);

export default PricingOverview;

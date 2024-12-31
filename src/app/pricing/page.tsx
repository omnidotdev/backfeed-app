"use client";
import { Stack } from "@omnidev/sigil";
import {
  PricingCard,
  PricingFAQ,
  PricingHeader,
} from "components/pricing/index";

/**
 * Pricing page.
 */
const PricingPage = () => (
    <Stack>
      <PricingHeader />

      <PricingCard />

      <PricingFAQ />
    </Stack>
);

export default PricingPage;

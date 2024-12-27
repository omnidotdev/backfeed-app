"use client";
import { VStack } from "@omnidev/sigil";
import { PricingCard, PricingFAQ, PricingHeader } from "components/pricing/index";

const PricingPage = () => {
  return (
    <VStack>
      <PricingHeader />

      <PricingCard />

      <PricingFAQ />
    </VStack>
  );
};

export default PricingPage;

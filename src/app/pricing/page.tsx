"use client";
import { VStack } from "@omnidev/sigil";
import PricingCard from "../../components/pricing/PricingCard";
import PricingFAQ from "../../components/pricing/PricingFAQ";
import PricingHeader from "../../components/pricing/PricingHeader";

export default function PricingPage() {
  return (
    <VStack>
      <PricingHeader />

      <PricingCard />

      <PricingFAQ />
    </VStack>
  );
}

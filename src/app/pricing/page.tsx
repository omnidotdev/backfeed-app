'use client';
import PricingCard from "../../components/pricing/PricingCard";
import PricingFAQ from "../../components/pricing/PricingFAQ"
import PricingHeader from "../../components/pricing/PricingHeader";

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <PricingHeader />
      <PricingCard />
      <PricingFAQ />
    </div>
  );
}
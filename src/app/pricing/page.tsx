import { HStack, Stack } from "@omnidev/sigil";

import { PricingCard, PricingFAQ, PricingHeader } from "components/pricing";
import { POLAR_ORGANIZATION_ID, app } from "lib/config";
import { polar } from "lib/polar";

export const metadata = {
  title: `${app.pricingPage.title} | ${app.name}`,
};

/**
 * Pricing page.
 */
const PricingPage = async () => {
  const { result } = await polar.products.list({
    organizationId: POLAR_ORGANIZATION_ID!,
    isArchived: false,
  });

  return (
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
        {/* ! NB: The order of the products naturally reflect the order they were created in the dashboard. This should be adjusted accordingly.*/}
        {result.items.reverse().map((product) => {
          const isProfessionalTier = product.name.includes("Professional");
          const isEnterpriseTier = product.name.includes("Enterprise");

          return (
            <PricingCard
              key={product.id}
              product={product}
              borderWidth={isProfessionalTier ? 2 : 1}
              borderColor={isProfessionalTier ? "brand.primary" : "none"}
              isRecommendedTier={isProfessionalTier}
              isPerMonthPricing={!isEnterpriseTier}
              ctaProps={{
                bgColor: isProfessionalTier
                  ? "brand.primary"
                  : "brand.secondary",
              }}
            />
          );
        })}
      </HStack>

      <PricingFAQ />
    </Stack>
  );
};

export default PricingPage;

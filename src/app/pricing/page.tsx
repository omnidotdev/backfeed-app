import { PricingOverview } from "components/pricing";
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

  console.log(result);

  return <PricingOverview />;
};

export default PricingPage;

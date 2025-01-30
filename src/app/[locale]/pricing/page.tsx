import { PricingOverview } from "components/pricing";
import { app } from "lib/config";

export const metadata = {
  title: `${app.pricingPage.title} | ${app.name}`,
};

/**
 * Pricing page.
 */
const PricingPage = () => <PricingOverview />;

export default PricingPage;

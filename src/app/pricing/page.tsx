import { redirect } from "next/navigation";

import { PricingOverview } from "components/pricing";
import { app } from "lib/config";
import { polar } from "lib/polar";
import { getAuthSession } from "lib/util";

export const metadata = {
  title: `${app.pricingPage.title} | ${app.name}`,
};

/**
 * Pricing page.
 */
const PricingPage = async () => {
  const [
    session,
    {
      result: { items: products },
    },
  ] = await Promise.all([
    getAuthSession(),
    polar.products.list({
      isArchived: false,
    }),
  ]);

  // TODO: update redirect to only redirect away from pricing page if a signed in user does not have a subscription
  if (session) redirect("/");

  // TODO: integrate products into PricingOverview component
  return <PricingOverview />;
};

export default PricingPage;

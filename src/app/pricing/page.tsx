import { redirect } from "next/navigation";

import { PricingOverview } from "components/pricing";
import { app } from "lib/config";
import { getAuthSession } from "lib/util";

export const metadata = {
  title: `${app.pricingPage.title} | ${app.name}`,
};

/**
 * Pricing page.
 */
const PricingPage = async () => {
  const session = await getAuthSession();

  if (session) redirect("/");

  return <PricingOverview />;
};

export default PricingPage;

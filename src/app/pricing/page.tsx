import { PricingOverview } from "components/pricing";
import { getCustomer, getPrices } from "lib/actions";
import { app } from "lib/config";
import { getAuthSession } from "lib/util";

import type { Price } from "components/pricing/PricingOverview/PricingOverview";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: app.pricingPage.title,
};

/**
 * Pricing page.
 */
const PricingPage = async () => {
  const [session, prices] = await Promise.all([getAuthSession(), getPrices()]);

  if (session) {
    const customer = await getCustomer();

    return (
      <PricingOverview
        user={session.user}
        prices={prices as Price[]}
        customer={customer}
      />
    );
  }

  return <PricingOverview user={undefined} prices={prices as Price[]} />;
};

export default PricingPage;

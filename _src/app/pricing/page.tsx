import { redirect } from "next/navigation";

import { auth } from "auth";
import { PricingOverview } from "components/pricing";
import { getCustomer, getPrices } from "lib/actions";
import { app } from "lib/config";

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
  const [session, prices] = await Promise.all([auth(), getPrices()]);

  if (session?.error) redirect("/");

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

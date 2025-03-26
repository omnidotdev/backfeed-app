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
      // ! NB: important that the product name includes this query string (i.e. Backfeed)
      query: app.name,
    }),
  ]);

  if (session) {
    // NB: `allSettled` is used to handle API errors, but take action on the results (i.e. replaces try/catch)
    const [customer] = await Promise.allSettled([
      polar.customers.getStateExternal({
        externalId: session.user.hidraId!,
      }),
    ]);

    if (
      customer.status !== "rejected" &&
      customer.value.activeSubscriptions.length
    )
      redirect(`/profile/${session.user.hidraId}`);
  }

  return <PricingOverview products={products} />;
};

export default PricingPage;

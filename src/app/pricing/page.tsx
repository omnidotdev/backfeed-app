import { redirect } from "next/navigation";

import { auth } from "auth";
import { PricingOverview } from "components/pricing";
import { app } from "lib/config";
import { BACKFEED_PRODUCT_IDS, polar } from "lib/polar";

export const dynamic = "force-dynamic";

export const metadata = {
  title: app.pricingPage.title,
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
    auth(),
    polar.products.list({
      id: BACKFEED_PRODUCT_IDS,
      sorting: ["price_amount"],
    }),
  ]);

  // TODO: Odd cases where session cookie is not removed after refresh token expires. Believe it to be that this route is not captured by the middleware and therefore the cookie is not removed. Fix this in order to remove check for `session.error`.
  if (session && !session.error) {
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
      redirect(`/profile/${session.user.hidraId}/subscription`);
  }

  return <PricingOverview products={products} />;
};

export default PricingPage;

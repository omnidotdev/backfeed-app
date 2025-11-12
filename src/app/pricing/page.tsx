import { redirect } from "next/navigation";

import { auth } from "auth";
import { PricingOverview } from "components/pricing";
import { app } from "lib/config";
import { BACKFEED_PRODUCT_IDS, polar } from "lib/polar";

import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
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

  if (session?.error) redirect("/");

  return <PricingOverview user={session?.user} products={products} />;
};

export default PricingPage;

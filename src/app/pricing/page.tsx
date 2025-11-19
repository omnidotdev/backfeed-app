import { redirect } from "next/navigation";

import { auth } from "auth";
import { PricingOverview } from "components/pricing";
import { getCustomer } from "lib/actions";
import { app } from "lib/config";
import { stripe } from "lib/payments/client";
import { PRODUCT_IDS } from "lib/payments/productIds";

import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: app.pricingPage.title,
};

/**
 * Pricing page.
 */
const PricingPage = async () => {
  const [session, { data: products }] = await Promise.all([
    auth(),
    stripe.products.list({
      ids: PRODUCT_IDS,
    }),
  ]);

  const pricedProducts = await Promise.all(
    products.map(async (product) => {
      const prices = await stripe.prices.list({
        product: product.id,
        active: true,
      });

      return { ...product, prices: prices.data };
    }),
  );

  if (session?.error) redirect("/");

  if (session) {
    const [customer] = await Promise.allSettled([
      getCustomer({ userId: session.user.hidraId! }),
    ]);

    return (
      <PricingOverview
        user={session.user}
        products={pricedProducts}
        // @ts-expect-error TODO: fix. Need to implement `getCustomer` logic
        customer={customer.status === "fulfilled" ? customer.value : undefined}
      />
    );
  }

  return <PricingOverview user={undefined} products={pricedProducts} />;
};

export default PricingPage;

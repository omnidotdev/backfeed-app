import { redirect } from "next/navigation";

import { auth } from "auth";
import { PricingOverview } from "components/pricing";
import { getCustomer, getProducts } from "lib/actions";
import { app } from "lib/config";

import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: app.pricingPage.title,
};

/**
 * Pricing page.
 */
const PricingPage = async () => {
  const [session, products] = await Promise.all([auth(), getProducts()]);

  if (session?.error) redirect("/");

  if (session) {
    const customer = await getCustomer();

    return (
      <PricingOverview
        user={session.user}
        products={products}
        customer={customer}
      />
    );
  }

  return <PricingOverview user={undefined} products={products} />;
};

export default PricingPage;

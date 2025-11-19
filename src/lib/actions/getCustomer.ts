"use server";

import { auth } from "auth";
import { stripe } from "lib/payments/client";

/**
 * Server action to get customer details.
 */
const getCustomer = async () => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const { data: customers } = await stripe.customers.search({
    query: `metadata["externalId"]:"${session.user.hidraId!}"`,
  });

  if (!customers.length) return undefined;

  const { data: subscriptions } = await stripe.subscriptions.list({
    customer: customers[0].id,
    status: "active",
  });

  return { ...customers[0], subscriptions };
};

export default getCustomer;

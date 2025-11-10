"use server";

import { auth } from "auth";
import { polar } from "lib/polar";

/**
 * Server action to get customer details.
 */
const getCustomer = async (userId: string) => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  const customerSession = await polar.customerSessions.create({
    externalCustomerId: userId,
  });

  const [customer, subscriptionResult] = await Promise.all([
    polar.customerPortal.customers.get({
      customerSession: customerSession.token,
    }),
    polar.subscriptions.list({
      externalCustomerId: userId,
      active: true,
    }),
  ]);

  return {
    ...customer,
    subscriptions: subscriptionResult.result.items,
  };
};

export default getCustomer;

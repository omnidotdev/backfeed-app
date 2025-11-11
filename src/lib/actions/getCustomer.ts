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
      // TODO: add active filter. Currently facing issue as described here: https://discord.com/channels/1078611507115470849/1437815007747248189
      // With the above issue, some subscriptions in profile page may render improperly when `active` filter is applied
      // active: true,
    }),
  ]);

  return {
    ...customer,
    subscriptions: subscriptionResult.result.items,
  };
};

export default getCustomer;

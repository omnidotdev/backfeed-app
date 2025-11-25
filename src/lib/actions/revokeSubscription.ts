"use server";

import payments from "lib/payments";
import getCustomer from "./getCustomer";

interface Options {
  /** Subscription ID. */
  subscriptionId: string;
}

/**
 * Server action to revoke a subscription immediately.
 */
const revokeSubscription = async ({ subscriptionId }: Options) => {
  const customer = await getCustomer();

  if (!customer?.subscriptions?.find((sub) => sub.id === subscriptionId))
    throw new Error("Unauthorized");

  const subscription = await payments.subscriptions.cancel(subscriptionId);

  return subscription.id;
};

export default revokeSubscription;

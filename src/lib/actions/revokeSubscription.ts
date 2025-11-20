"use server";

import { stripe } from "lib/payments/client";
import getCustomer from "./getCustomer";

interface Options {
  /** Subscription ID. */
  subscriptionId: string;
}

const revokeSubscription = async ({ subscriptionId }: Options) => {
  const customer = await getCustomer();

  if (!customer?.subscriptions?.find((sub) => sub.id === subscriptionId))
    throw new Error("Unauthorized");

  const subscription = await stripe.subscriptions.cancel(subscriptionId);

  return subscription.id;
};

export default revokeSubscription;

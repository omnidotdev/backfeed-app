"use server";

import { auth } from "auth";
import { stripe } from "lib/payments/client";

interface Options {
  /** Subscription ID. */
  subscriptionId: string;
}

const revokeSubscription = async ({ subscriptionId }: Options) => {
  const session = await auth();

  if (!session) throw new Error("Unauthorized");

  const subscription = await stripe.subscriptions.cancel(subscriptionId);

  return subscription.id;
};

export default revokeSubscription;

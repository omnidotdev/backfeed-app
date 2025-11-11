"use server";

import { auth } from "auth";
import { polar } from "lib/polar";

interface Options {
  /** Subscription ID. */
  subscriptionId: string;
}

const revokeSubscription = async ({ subscriptionId }: Options) => {
  const session = await auth();

  if (!session) throw new Error("Unauthorized");

  const result = await polar.subscriptions.revoke({
    id: subscriptionId,
  });

  return result;
};

export default revokeSubscription;

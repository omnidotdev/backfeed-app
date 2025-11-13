"use server";

import { auth } from "auth";
import { polar } from "lib/polar";

interface Options {
  /** Subscription ID. */
  subscriptionId: string;
  /** Whether to cancel subscription at end of of current period. */
  cancelAtEndOfPeriod?: true;
}

const revokeSubscription = async ({
  subscriptionId,
  cancelAtEndOfPeriod,
}: Options) => {
  const session = await auth();

  if (!session) throw new Error("Unauthorized");

  if (cancelAtEndOfPeriod) {
    return await polar.subscriptions.update({
      id: subscriptionId,
      subscriptionUpdate: {
        cancelAtPeriodEnd: true,
      },
    });
  }

  const result = await polar.subscriptions.revoke({
    id: subscriptionId,
  });

  return result;
};

export default revokeSubscription;

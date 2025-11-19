"use server";

import { auth } from "auth";

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

  // TODO: add logic for stripe integration
};

export default revokeSubscription;

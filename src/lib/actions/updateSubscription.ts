"use server";

import { revalidatePath } from "next/cache";

import { auth } from "auth";
import { polar } from "lib/polar";

interface Options {
  /** Current subscription ID. */
  subscriptionId: string;
  /** New product ID that the subscription will be updated to. */
  productId: string;
}

/**
 * Server action to update a customer's subscription.
 */
const updateSubscription = async ({ subscriptionId, productId }: Options) => {
  const session = await auth();

  if (!session) throw new Error("Unauthorized");

  const customerSession = await polar.customerSessions.create({
    externalCustomerId: session.user.hidraId!,
  });

  const result = await polar.customerPortal.subscriptions.update(
    {
      customerSession: customerSession.token,
    },
    {
      id: subscriptionId,
      customerSubscriptionUpdate: {
        productId,
      },
    },
  );

  revalidatePath("/profile/[userId]/subscriptions");

  return result;
};

export default updateSubscription;

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

  const currentSubscription = await polar.subscriptions.get({
    id: subscriptionId,
  });

  // NB: if a current subscription has already been set to cancel at period end and you try to update to another product, the update will fail.
  // Here we check to see if this is the case, and if so, we first "uncancel" the current subscription before proceeding to the update
  if (currentSubscription.cancelAtPeriodEnd) {
    await polar.subscriptions.update({
      id: subscriptionId,
      subscriptionUpdate: {
        cancelAtPeriodEnd: false,
      },
    });
  }

  await polar.subscriptions.update({
    id: subscriptionId,
    subscriptionUpdate: {
      productId,
    },
  });

  revalidatePath("/profile/[userId]/organizations");
  revalidatePath("/organizations/[organizationSlug]/settings");
  revalidatePath("/pricing");
};

export default updateSubscription;

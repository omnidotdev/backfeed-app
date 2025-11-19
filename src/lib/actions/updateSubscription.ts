"use server";

import { revalidatePath } from "next/cache";

import { auth } from "auth";

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

  // TODO: add logic for stripe integration

  revalidatePath("/profile/[userId]/organizations");
  revalidatePath("/organizations/[organizationSlug]/settings");
  revalidatePath("/pricing");
};

export default updateSubscription;

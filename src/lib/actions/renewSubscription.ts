"use server";

import { revalidatePath } from "next/cache";

import payments from "lib/payments";
import getCustomer from "./getCustomer";

interface Options {
  /** Subscription ID. */
  subscriptionId: string;
}

/**
 * Server action to renew a subscription that is set to be canceled at the end of the current billing period.
 */
const renewSubscription = async ({ subscriptionId }: Options) => {
  const customer = await getCustomer();

  if (!customer?.subscriptions.find((sub) => sub.id === subscriptionId))
    throw new Error("Unauthorized");

  await payments.subscriptions.update(subscriptionId, {
    cancel_at: null,
  });

  revalidatePath("/organizations/[organizationSlug]/settings");
  revalidatePath("/profile/[userId]/subscriptions");
  revalidatePath("/pricing");
};

export default renewSubscription;

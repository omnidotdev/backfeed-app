"use server";

import { revalidatePath } from "next/cache";

import { stripe } from "lib/payments/client";
import getCustomer from "./getCustomer";

interface Options {
  /** Subscription ID. */
  subscriptionId: string;
}

const renewSubscription = async ({ subscriptionId }: Options) => {
  const customer = await getCustomer();

  if (!customer?.subscriptions.find((sub) => sub.id === subscriptionId))
    throw new Error("Unauthorized");

  await stripe.subscriptions.update(subscriptionId, {
    cancel_at: null,
  });

  revalidatePath("/organizations/[organizationSlug]/settings");
  revalidatePath("/profile/[userId]/organizations");
  revalidatePath("/pricing");
};

export default renewSubscription;

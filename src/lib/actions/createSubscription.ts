"use server";

import { revalidatePath } from "next/cache";

import { auth } from "auth";
import { stripe } from "lib/payments/client";
import getCustomer from "./getCustomer";

import type Stripe from "stripe";

interface Options {
  /** Organization ID */
  organizationId: string;
}

const createSubscription = async ({ organizationId }: Options) => {
  const session = await auth();

  if (!session) throw new Error("Unauthorized");

  let customer: Omit<Stripe.Customer, "subscriptions">;

  const currentCustomer = await getCustomer();

  if (currentCustomer) {
    customer = currentCustomer;
  } else {
    customer = await stripe.customers.create({
      email: session.user.email!,
      name: session.user.name ?? undefined,
      metadata: {
        externalId: session.user.hidraId!,
      },
    });
  }

  if (!customer) throw new Error("Issue creating customer");

  await stripe.subscriptions.create({
    customer: customer.id,
    // TODO: dynamic price ID (must be free tier)
    items: [{ price: "price_1SVBSDI5aTKW2dpwMcbkS2Ds" }],
    metadata: {
      organizationId,
    },
  });

  revalidatePath("/profile/[userId]/organizations");
  revalidatePath("/organizations/[organizationSlug]/settings");
  revalidatePath("/pricing");
};

export default createSubscription;

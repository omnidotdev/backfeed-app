"use server";

import { auth } from "auth";
import getCustomer from "lib/actions/getCustomer";
import { app } from "lib/config";
import payments from "lib/payments";

import type Stripe from "stripe";

interface CreateCheckout {
  /** Checkout flow type. */
  type: "create";
  /** URL to redirect user to after a successful checkout. */
  successUrl: string;
  /** Organization ID. */
  organizationId: string;
  /** Price ID associated with the product. */
  priceId: string;
}

interface UpdateSubscription {
  /** Checkout flow type. */
  type: "update";
  /** Subscription ID. */
  subscriptionId: string;
  /** URL to redirect user to if the update is not completed. */
  returnUrl: string;
}

interface Options {
  /** Checkout options. */
  checkout: CreateCheckout | UpdateSubscription;
}

/**
 * Server action to generate a URL that allows a user to proceed with either creating a subscription, or updating a current one.
 */
const createCheckoutSession = async ({ checkout }: Options) => {
  const authSession = await auth();

  if (!authSession) throw new Error("Unauthorized");

  let customer: Omit<Stripe.Customer, "subscriptions">;

  const currentCustomer = await getCustomer();

  if (currentCustomer) {
    customer = currentCustomer;
  } else {
    customer = await payments.customers.create({
      email: authSession.user.email!,
      name: authSession.user.name ?? undefined,
      metadata: {
        externalId: authSession.user.hidraId!,
      },
    });
  }

  if (checkout.type === "create") {
    const session = await payments.checkout.sessions.create({
      mode: "subscription",
      customer: customer.id,
      success_url: checkout.successUrl,
      line_items: [{ price: checkout.priceId, quantity: 1 }],
      subscription_data: {
        metadata: {
          organizationId: checkout.organizationId,
          omniProduct: app.name.toLowerCase(),
        },
      },
    });

    return session.url!;
  }

  if (
    !currentCustomer?.subscriptions?.find(
      (sub) => sub.id === checkout.subscriptionId,
    )
  )
    throw new Error("Unauthorized");

  const session = await payments.billingPortal.sessions.create({
    customer: customer.id,
    flow_data: {
      type: "subscription_update",
      subscription_update: {
        subscription: checkout.subscriptionId,
      },
      after_completion: {
        type: "redirect",
        redirect: {
          return_url: checkout.returnUrl,
        },
      },
    },
    return_url: checkout.returnUrl,
  });

  return session.url;
};

export default createCheckoutSession;

"use server";

import { auth } from "auth";
import { stripe } from "lib/payments/client";
import getCustomer from "./getCustomer";

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
  /** Updated product details to apply to the subscription. */
  product: {
    id: string;
    priceId: string;
  };
}

interface Options {
  /** Checkout options. */
  checkout: CreateCheckout | UpdateSubscription;
}

const createCheckoutSession = async ({ checkout }: Options) => {
  const authSession = await auth();

  if (!authSession) throw new Error("Unauthorized");

  let customer: Omit<Stripe.Customer, "subscriptions">;

  const currentCustomer = await getCustomer();

  if (currentCustomer) {
    customer = currentCustomer;
  } else {
    customer = await stripe.customers.create({
      email: authSession.user.email!,
      name: authSession.user.name ?? undefined,
      metadata: {
        externalId: authSession.user.hidraId!,
      },
    });
  }

  if (checkout.type === "create") {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customer.id,
      success_url: checkout.successUrl,
      line_items: [{ price: checkout.priceId, quantity: 1 }],
      subscription_data: {
        metadata: {
          organizationId: checkout.organizationId,
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

  const configuration = await stripe.billingPortal.configurations.create({
    features: {
      payment_method_update: {
        enabled: true,
      },
      subscription_update: {
        enabled: true,
        default_allowed_updates: ["price"],
        products: [
          { product: checkout.product.id, prices: [checkout.product.priceId] },
        ],
      },
    },
  });

  const session = await stripe.billingPortal.sessions.create({
    customer: customer.id,
    configuration: configuration.id,
    flow_data: {
      type: "subscription_update",
      subscription_update: {
        subscription: checkout.subscriptionId,
      },
    },
    return_url: checkout.returnUrl,
  });

  return session.url;
};

export default createCheckoutSession;

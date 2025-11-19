"use server";

import { stripe } from "lib/payments/client";
import getCustomer from "./getCustomer";

interface CreateCheckout {
  type: "create";
  successUrl: string;
  organizationId: string;
  priceId: string;
}

interface UpdateSubscription {
  type: "update";
  subscriptionId: string;
  returnUrl: string;
  product: {
    id: string;
    priceId: string;
  };
}

interface Options {
  checkout: CreateCheckout | UpdateSubscription;
}

const createCheckoutSession = async ({ checkout }: Options) => {
  // TODO: determine if this is sufficient
  const customer = await getCustomer();

  if (checkout.type === "create") {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customer?.id,
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
    customer: customer?.id!,
    configuration: configuration.id,
    flow_data: {
      type: "subscription_update",
      subscription_update: {
        subscription: checkout.subscriptionId!,
      },
    },
    return_url: checkout.returnUrl,
  });

  return session.url;
};

export default createCheckoutSession;

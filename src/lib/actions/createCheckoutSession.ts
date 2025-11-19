"use server";

import { stripe } from "lib/payments/client";
import getCustomer from "./getCustomer";

interface Options {
  subscriptionId: string;
  returnUrl: string;
  product?: {
    id: string;
    priceId: string;
  };
}

const createCheckoutSession = async ({
  subscriptionId,
  returnUrl,
  product,
}: Options) => {
  const customer = await getCustomer();

  const configuration = await stripe.billingPortal.configurations.create({
    features: {
      payment_method_update: {
        enabled: true,
      },
      subscription_update: {
        enabled: true,
        default_allowed_updates: ["price"],
        products: product
          ? [{ product: product.id, prices: [product.priceId] }]
          : // TODO: map over all available Backfeed products as fallback
            [
              {
                product: "prod_TS5lVsZQm77d8t",
                prices: [
                  "price_1SVBaEI5aTKW2dpw8v08k3Jc",
                  "price_1SVBb5I5aTKW2dpwtaUvDrk5",
                ],
              },
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
        subscription: subscriptionId,
      },
    },
    return_url: returnUrl,
  });

  return session.url;
};

export default createCheckoutSession;

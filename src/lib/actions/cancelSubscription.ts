"use server";

import payments from "lib/payments";
import getCustomer from "./getCustomer";

interface Options {
  /** Subscription ID. */
  subscriptionId: string;
  /** URL to redirect user to if the update is not completed. */
  returnUrl: string;
}

/**
 * Server action to cancel a subscription at the end of it's current billing period.
 */
const cancelSubscription = async ({ subscriptionId, returnUrl }: Options) => {
  const customer = await getCustomer();

  const isCustomersSubscription = !!customer?.subscriptions.find(
    (sub) => sub.id === subscriptionId,
  );

  if (!isCustomersSubscription || !customer) throw new Error("Unauthorized");

  const configuration = await payments.billingPortal.configurations.create({
    features: {
      subscription_cancel: {
        enabled: true,
        mode: "at_period_end",
        cancellation_reason: {
          enabled: true,
          options: [
            "customer_service",
            "missing_features",
            "switched_service",
            "too_expensive",
            "other",
          ],
        },
      },
    },
  });

  const session = await payments.billingPortal.sessions.create({
    customer: customer.id,
    configuration: configuration.id,
    flow_data: {
      type: "subscription_cancel",
      subscription_cancel: {
        subscription: subscriptionId,
      },
    },
    return_url: returnUrl,
  });

  return session.url;
};

export default cancelSubscription;

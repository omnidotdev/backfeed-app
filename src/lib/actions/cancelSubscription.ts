"use server";

import getCustomer from "lib/actions/getCustomer";
import { STRIPE_PORTAL_SESSION_CONFIGURATION_ID } from "lib/config";
import payments from "lib/payments";

interface Options {
  /** Subscription ID. */
  subscriptionId: string;
  /** URL to redirect user to if the update is not completed. */
  returnUrl: string;
}

/**
 * Server action to cancel a subscription at the end of its current billing period.
 */
const cancelSubscription = async ({ subscriptionId, returnUrl }: Options) => {
  const customer = await getCustomer();

  const isCustomersSubscription = !!customer?.subscriptions.find(
    (sub) => sub.id === subscriptionId,
  );

  if (!isCustomersSubscription || !customer) throw new Error("Unauthorized");

  const session = await payments.billingPortal.sessions.create({
    customer: customer.id,
    configuration: STRIPE_PORTAL_SESSION_CONFIGURATION_ID,
    flow_data: {
      type: "subscription_cancel",
      subscription_cancel: {
        subscription: subscriptionId,
      },
      after_completion: {
        type: "redirect",
        redirect: {
          return_url: returnUrl,
        },
      },
    },
    return_url: returnUrl,
  });

  return session.url;
};

export default cancelSubscription;

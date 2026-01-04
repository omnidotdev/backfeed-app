import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import app from "@/lib/config/app.config";
import { BILLING_BASE_URL } from "@/lib/config/env.config";
import payments from "@/lib/payments";
import { authMiddleware, customerMiddleware } from "@/server/middleware";

import type Stripe from "stripe";

const subscriptionSchema = z.object({
  subscriptionId: z.string().startsWith("sub_").nullable(),
});

const billingPortalSchema = z.object({
  workspaceId: z.guid(),
  returnUrl: z.url(),
});

const createSubscriptionSchema = z.object({
  workspaceId: z.guid(),
  priceId: z.string().startsWith("price_"),
  successUrl: z.url(),
});

const renewSubscriptionSchema = z.object({
  subscriptionId: z.string().startsWith("sub_"),
});

export const getSubscriptions = createServerFn()
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { data: customers } = await payments.customers.search({
      query: `metadata["externalId"]:"${context.session.user.identityProviderId!}"`,
    });

    if (!customers.length) return undefined;

    const { data: subscriptions } = await payments.subscriptions.list({
      customer: customers[0].id,
      status: "active",
    });

    return subscriptions.map((sub) => ({
      id: sub.id,
      subscriptionStatus: sub.status,
      toBeCanceled: !!sub.cancel_at,
      currentPeriodEnd: sub.items.data[0].current_period_end,
    }));
  });

export const getSubscription = createServerFn()
  .inputValidator((data) => subscriptionSchema.parse(data))
  .handler(async ({ data }) => {
    if (!data.subscriptionId) return null;

    const subscription = await payments.subscriptions.retrieve(
      data.subscriptionId,
      {
        expand: ["items.data.price.product"],
      },
    );

    return {
      id: subscription.id,
      status: subscription.status,
      cancelAt: subscription.cancel_at,
      currentPeriodEnd: subscription.items.data[0].current_period_end,
      priceId: subscription.items.data[0].price.id,
      product: subscription.items.data[0].price.product as Stripe.Product,
    };
  });

export const revokeSubscription = createServerFn({ method: "POST" })
  .inputValidator((data) => subscriptionSchema.parse(data))
  .middleware([customerMiddleware])
  .handler(async ({ data, context }) => {
    if (!context.customer) throw new Error("Unauthorized");

    const subscription = await payments.subscriptions.cancel(
      data.subscriptionId!,
    );

    return subscription.id;
  });

/**
 * Get billing portal URL.
 * This creates a Stripe billing portal session through Aether,
 * which looks up the billing account by workspace ID.
 */
export const getBillingPortalUrl = createServerFn({ method: "POST" })
  .inputValidator((data) => billingPortalSchema.parse(data))
  .middleware([customerMiddleware])
  .handler(async ({ data, context }) => {
    if (!context.session) throw new Error("Unauthorized");

    const response = await fetch(
      `${BILLING_BASE_URL}/billing-portal/workspace/${data.workspaceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${context.session.accessToken}`,
        },
        body: JSON.stringify({
          productId: "backfeed",
          returnUrl: data.returnUrl,
        }),
      },
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || "Failed to get billing portal URL");
    }

    const { url } = await response.json();
    return url as string;
  });

export const getCreateSubscriptionUrl = createServerFn({ method: "POST" })
  .inputValidator((data) => createSubscriptionSchema.parse(data))
  .middleware([customerMiddleware])
  .handler(async ({ data, context }) => {
    let customer = context.customer;

    if (!customer) {
      customer = await payments.customers.create({
        email: context.session.user.email!,
        name: context.session.user.name ?? undefined,
        metadata: {
          externalId: context.session.user.identityProviderId!,
        },
      });
    }

    const checkout = await payments.checkout.sessions.create({
      mode: "subscription",
      customer: customer.id,
      success_url: data.successUrl,
      line_items: [{ price: data.priceId, quantity: 1 }],
      subscription_data: {
        metadata: {
          workspaceId: data.workspaceId,
          omniProduct: app.name.toLowerCase(),
        },
      },
    });

    return checkout.url!;
  });

export const renewSubscription = createServerFn({ method: "POST" })
  .inputValidator((data) => renewSubscriptionSchema.parse(data))
  .middleware([customerMiddleware])
  .handler(async ({ data, context }) => {
    if (!context.customer) throw new Error("Unauthorized");

    await payments.subscriptions.update(data.subscriptionId, {
      cancel_at: null,
    });
  });

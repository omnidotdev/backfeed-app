import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import app from "@/lib/config/app.config";
import { BILLING_BASE_URL } from "@/lib/config/env.config";
import payments from "@/lib/payments";
import { customerMiddleware } from "@/server/middleware";

const workspaceSchema = z.object({
  workspaceId: z.guid(),
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

/**
 * Get subscription details for a workspace via billing service.
 */
export const getSubscription = createServerFn()
  .inputValidator((data) => workspaceSchema.parse(data))
  .middleware([customerMiddleware])
  .handler(async ({ data, context }) => {
    if (!context.session) return null;

    try {
      const response = await fetch(
        `${BILLING_BASE_URL}/billing-portal/subscription/workspace/${data.workspaceId}`,
        {
          headers: {
            Authorization: `Bearer ${context.session.accessToken}`,
          },
        },
      );

      if (!response.ok) {
        console.error("Failed to fetch subscription:", await response.text());
        return null;
      }

      const { subscription } = await response.json();
      return subscription as {
        id: string;
        status: string;
        cancelAt: number | null;
        currentPeriodEnd: number;
        priceId: string;
        product: {
          id: string;
          name: string;
          description: string | null;
          marketing_features: Array<{ name: string }>;
        } | null;
      } | null;
    } catch (error) {
      console.error("Failed to fetch subscription:", error);
      return null;
    }
  });

/**
 * Cancel a subscription for a workspace via billing service.
 */
export const revokeSubscription = createServerFn({ method: "POST" })
  .inputValidator((data) => workspaceSchema.parse(data))
  .middleware([customerMiddleware])
  .handler(async ({ data, context }) => {
    if (!context.session) throw new Error("Unauthorized");

    const response = await fetch(
      `${BILLING_BASE_URL}/billing-portal/subscription/workspace/${data.workspaceId}/cancel`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${context.session.accessToken}`,
        },
      },
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || "Failed to cancel subscription");
    }

    const { id } = await response.json();
    return id as string;
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

/**
 * Renew a subscription (remove scheduled cancellation) via billing service.
 */
export const renewSubscription = createServerFn({ method: "POST" })
  .inputValidator((data) => workspaceSchema.parse(data))
  .middleware([customerMiddleware])
  .handler(async ({ data, context }) => {
    if (!context.session) throw new Error("Unauthorized");

    const response = await fetch(
      `${BILLING_BASE_URL}/billing-portal/subscription/workspace/${data.workspaceId}/renew`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${context.session.accessToken}`,
        },
      },
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.error || "Failed to renew subscription");
    }
  });

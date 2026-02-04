import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import app from "@/lib/config/app.config";
import billing, { type Subscription } from "@/lib/providers/billing";
import { authMiddleware, customerMiddleware } from "@/server/middleware";

/**
 * Schema for organization-based billing operations.
 * Billing is tied to organizations (from Gatekeeper), not local workspace tables.
 */
const organizationSchema = z.object({
  organizationId: z.string(),
});

const billingPortalSchema = z.object({
  organizationId: z.string(),
  returnUrl: z.url(),
});

const createSubscriptionSchema = z.object({
  organizationId: z.string(),
  priceId: z.string().startsWith("price_"),
  successUrl: z.url(),
});

const checkoutWithWorkspaceSchema = z
  .object({
    priceId: z.string().startsWith("price_"),
    successUrl: z.string().url(),
    cancelUrl: z.string().url(),
    // Either workspaceId or createWorkspace must be provided
    workspaceId: z.string().uuid().optional(),
    createWorkspace: z
      .object({
        name: z.string().min(1).max(100),
        slug: z.string().min(1).max(100).optional(),
      })
      .optional(),
  })
  .refine((data) => data.workspaceId || data.createWorkspace, {
    message: "Either workspaceId or createWorkspace is required",
  });

/**
 * Get subscription details for an organization via billing service.
 */
export const getSubscription = createServerFn()
  .inputValidator((data) => organizationSchema.parse(data))
  .middleware([customerMiddleware])
  .handler(async ({ data, context }): Promise<Subscription | null> => {
    if (!context.session?.accessToken) return null;

    return billing.getSubscription(
      "backfeed/organization",
      data.organizationId,
      context.session.accessToken,
    );
  });

/**
 * Cancel a subscription for an organization via billing service.
 * @knipignore - exported for future subscription cancellation UI
 */
export const revokeSubscription = createServerFn({ method: "POST" })
  .inputValidator((data) => organizationSchema.parse(data))
  .middleware([customerMiddleware])
  .handler(async ({ data, context }) => {
    if (!context.session?.accessToken) throw new Error("Unauthorized");

    return billing.cancelSubscription(
      "backfeed/organization",
      data.organizationId,
      context.session.accessToken,
    );
  });

/**
 * Get billing portal URL.
 * This creates a Stripe billing portal session through Aether,
 * which looks up the billing account by organization ID.
 */
export const getBillingPortalUrl = createServerFn({ method: "POST" })
  .inputValidator((data) => billingPortalSchema.parse(data))
  .middleware([customerMiddleware])
  .handler(async ({ data, context }) => {
    if (!context.session?.accessToken) throw new Error("Unauthorized");

    return billing.getBillingPortalUrl(
      "backfeed/organization",
      data.organizationId,
      "backfeed",
      data.returnUrl,
      context.session.accessToken,
    );
  });

export const getCreateSubscriptionUrl = createServerFn({ method: "POST" })
  .inputValidator((data) => createSubscriptionSchema.parse(data))
  .middleware([customerMiddleware])
  .handler(async ({ data, context }) => {
    return billing.createCheckoutSession({
      priceId: data.priceId,
      successUrl: data.successUrl,
      customerEmail: context.session.user.email!,
      customerName: context.session.user.name ?? undefined,
      customerId: context.customer?.id,
      metadata: {
        externalId: context.session.user.identityProviderId!,
        app_id: "backfeed",
        entity_type: "organization",
        entity_id: data.organizationId,
      },
    });
  });

/**
 * Renew a subscription (remove scheduled cancellation) via billing service.
 */
export const renewSubscription = createServerFn({ method: "POST" })
  .inputValidator((data) => organizationSchema.parse(data))
  .middleware([customerMiddleware])
  .handler(async ({ data, context }) => {
    if (!context.session?.accessToken) throw new Error("Unauthorized");

    await billing.renewSubscription(
      "backfeed/organization",
      data.organizationId,
      context.session.accessToken,
    );
  });

/**
 * Create a checkout session with workspace creation/selection.
 * Routes through Aether for orchestration.
 */
export const createCheckoutWithWorkspace = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .inputValidator((data) => checkoutWithWorkspaceSchema.parse(data))
  .handler(async ({ data, context }) => {
    if (!context.session?.accessToken) throw new Error("Unauthorized");

    return billing.createCheckoutWithWorkspace({
      appId: app.name.toLowerCase(),
      priceId: data.priceId,
      successUrl: data.successUrl,
      cancelUrl: data.cancelUrl,
      accessToken: context.session.accessToken,
      workspaceId: data.workspaceId,
      createWorkspace: data.createWorkspace,
    });
  });

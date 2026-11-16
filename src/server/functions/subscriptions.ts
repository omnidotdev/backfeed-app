import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import billing, { type Subscription } from "@/lib/providers/billing";
import { authMiddleware } from "@/server/middleware";

/**
 * Schema for organization-based billing operations.
 * Billing is tied to organizations (from Gatekeeper), not local workspace tables.
 */
const organizationSchema = z.object({
  organizationId: z.string(),
});

/**
 * Get subscription details for an organization via billing service. Buying,
 * changing, canceling, and renewing a plan happen on the Omni account hub (see
 * `lib/billing/hubLinks`), not here
 */
export const getSubscription = createServerFn({ method: "POST" })
  .inputValidator((data) => organizationSchema.parse(data))
  .middleware([authMiddleware])
  .handler(async ({ data, context }): Promise<Subscription | null> => {
    if (!context.session?.accessToken) return null;

    return billing.getSubscription(
      "organization",
      data.organizationId,
      context.session.accessToken,
    );
  });

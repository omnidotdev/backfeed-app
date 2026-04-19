/**
 * Billing provider for Backfeed.
 *
 * Thin wrapper around @omnidotdev/providers.
 */

import { createBillingProvider } from "@omnidotdev/providers/billing";

import { BILLING_BASE_URL } from "@/lib/config/env.config";

export type {
  BillingProvider,
  CheckoutParams,
  CheckoutWithWorkspaceParams,
  CheckoutWithWorkspaceResponse,
  Entitlement,
  EntitlementsResponse,
  Price,
  Subscription,
} from "@omnidotdev/providers/billing";

const billing = createBillingProvider(
  BILLING_BASE_URL
    ? { provider: "aether", baseUrl: BILLING_BASE_URL, appId: "backfeed" }
    : {},
);

export default billing;

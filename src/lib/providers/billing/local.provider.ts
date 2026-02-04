import type {
  BillingProvider,
  CheckoutParams,
  CheckoutWithWorkspaceParams,
  CheckoutWithWorkspaceResponse,
  Entitlement,
  EntitlementsResponse,
  Price,
  Subscription,
} from "./interface";

/**
 * Create a self-hosted entitlement.
 */
const createEntitlement = (
  featureKey: string,
  value: string,
  productId: string,
): Entitlement => ({
  id: `self-hosted-${featureKey}`,
  featureKey,
  value,
  productId,
  source: "self-hosted",
  validFrom: "1970-01-01T00:00:00Z",
  validUntil: null,
});

/**
 * Self-hosted entitlements - all features unlocked.
 */
const UNLIMITED_ENTITLEMENTS: EntitlementsResponse = {
  billingAccountId: "self-hosted",
  entityType: "organization",
  entityId: "self-hosted",
  entitlementVersion: 1,
  entitlements: [
    createEntitlement("tier", "enterprise", "backfeed"),
    createEntitlement("max_projects", "unlimited", "backfeed"),
    createEntitlement("max_feedback_users", "unlimited", "backfeed"),
    createEntitlement("max_comments_per_post", "unlimited", "backfeed"),
    createEntitlement("max_members", "unlimited", "backfeed"),
    createEntitlement("max_admins", "unlimited", "backfeed"),
  ],
};

/**
 * Self-hosted subscription (unlimited).
 */
const SELF_HOSTED_SUBSCRIPTION: Subscription = {
  id: "self-hosted",
  status: "active",
  cancelAt: null,
  currentPeriodEnd: Date.now() / 1000 + 365 * 24 * 60 * 60, // 1 year from now
  priceId: "self-hosted",
  product: {
    id: "self-hosted",
    name: "Self-Hosted Enterprise",
    description: "All features included",
    marketing_features: [{ name: "Unlimited everything" }],
  },
};

/**
 * Local billing provider.
 * Returns unlimited entitlements for self-hosted mode.
 */
class LocalBillingProvider implements BillingProvider {
  async getEntitlements(
    entityType: string,
    entityId: string,
    _productId?: string,
    _accessToken?: string,
  ): Promise<EntitlementsResponse> {
    return {
      ...UNLIMITED_ENTITLEMENTS,
      entityType,
      entityId,
    };
  }

  async checkEntitlement(
    _entityType: string,
    _entityId: string,
    _productId: string,
    featureKey: string,
    _accessToken?: string,
  ): Promise<string | null> {
    const entitlement = UNLIMITED_ENTITLEMENTS.entitlements.find(
      (e) => e.featureKey === featureKey,
    );
    return entitlement?.value ?? "unlimited";
  }

  async getPrices(_appName: string): Promise<Price[]> {
    // No prices in self-hosted mode - all features included
    return [];
  }

  async createCheckoutSession(_params: CheckoutParams): Promise<string> {
    throw new Error("Billing is not available in self-hosted mode");
  }

  async createCheckoutWithWorkspace(
    _params: CheckoutWithWorkspaceParams,
  ): Promise<CheckoutWithWorkspaceResponse> {
    throw new Error("Billing is not available in self-hosted mode");
  }

  async getSubscription(
    _entityType: string,
    _entityId: string,
    _accessToken: string,
  ): Promise<Subscription> {
    return SELF_HOSTED_SUBSCRIPTION;
  }

  async getBillingPortalUrl(
    _entityType: string,
    _entityId: string,
    _productId: string,
    returnUrl: string,
    _accessToken: string,
  ): Promise<string> {
    // In self-hosted mode, redirect back to the return URL
    // since there's no billing portal
    return returnUrl;
  }

  async cancelSubscription(
    _entityType: string,
    _entityId: string,
    _accessToken: string,
  ): Promise<string> {
    // No-op in self-hosted mode
    return "self-hosted";
  }

  async renewSubscription(
    _entityType: string,
    _entityId: string,
    _accessToken: string,
  ): Promise<void> {
    // No-op in self-hosted mode
  }

  async healthCheck(): Promise<{ healthy: boolean; message?: string }> {
    return { healthy: true, message: "Local provider always healthy" };
  }
}

export default LocalBillingProvider;

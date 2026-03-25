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
 * Create a local entitlement.
 */
const createEntitlement = (
  featureKey: string,
  value: string,
  productId: string,
): Entitlement => ({
  id: `local-${featureKey}`,
  featureKey,
  value,
  productId,
  source: "local",
  validFrom: "1970-01-01T00:00:00Z",
  validUntil: null,
});

/**
 * Local entitlements - all features unlocked.
 */
const UNLIMITED_ENTITLEMENTS: EntitlementsResponse = {
  billingAccountId: "local",
  entityType: "organization",
  entityId: "local",
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
 * Local subscription (unlimited).
 */
const LOCAL_SUBSCRIPTION: Subscription = {
  id: "local",
  status: "active",
  cancelAt: null,
  currentPeriodEnd: Date.now() / 1000 + 365 * 24 * 60 * 60, // 1 year from now
  priceId: "local",
  product: {
    id: "local",
    name: "Local Enterprise",
    description: "All features included",
    marketing_features: [{ name: "Unlimited everything" }],
  },
};

/**
 * Local billing provider.
 * Returns unlimited entitlements when billing is not configured.
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
    // No prices in local mode - all features included
    return [];
  }

  async createCheckoutSession(_params: CheckoutParams): Promise<string> {
    throw new Error("Billing is not configured");
  }

  async createCheckoutWithWorkspace(
    _params: CheckoutWithWorkspaceParams,
  ): Promise<CheckoutWithWorkspaceResponse> {
    throw new Error("Billing is not configured");
  }

  async getSubscription(
    _entityType: string,
    _entityId: string,
    _accessToken: string,
  ): Promise<Subscription> {
    return LOCAL_SUBSCRIPTION;
  }

  async getBillingPortalUrl(
    _entityType: string,
    _entityId: string,
    _productId: string,
    returnUrl: string,
    _accessToken: string,
  ): Promise<string> {
    // No billing portal configured, redirect back to the return URL
    return returnUrl;
  }

  async cancelSubscription(
    _entityType: string,
    _entityId: string,
    _accessToken: string,
  ): Promise<string> {
    // No-op in local mode
    return "local";
  }

  async renewSubscription(
    _entityType: string,
    _entityId: string,
    _accessToken: string,
  ): Promise<void> {
    // No-op in local mode
  }

  async healthCheck(): Promise<{ healthy: boolean; message?: string }> {
    return { healthy: true, message: "Local provider always healthy" };
  }
}

export default LocalBillingProvider;

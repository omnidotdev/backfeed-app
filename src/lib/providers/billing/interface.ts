/**
 * Entitlement from billing service.
 */
export interface Entitlement {
  id: string;
  productId: string;
  featureKey: string;
  value: string | null;
  source: string;
  validFrom: string;
  validUntil: string | null;
}

/**
 * Entitlements response from billing service.
 */
export interface EntitlementsResponse {
  billingAccountId: string;
  entityType: string;
  entityId: string;
  entitlementVersion: number;
  entitlements: Entitlement[];
}

/**
 * Subscription details.
 */
export interface Subscription {
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
}

/**
 * Product information.
 */
export interface Product {
  id: string;
  name: string;
  description: string | null;
  marketing_features: Array<{ name: string }>;
}

/**
 * Recurring billing details.
 */
export interface Recurring {
  interval: "day" | "week" | "month" | "year";
  interval_count: number;
  meter?: string | null;
  trial_period_days?: number | null;
  usage_type?: "licensed" | "metered";
}

/**
 * Price with expanded product.
 */
export interface Price {
  id: string;
  active: boolean;
  currency: string;
  unit_amount: number | null;
  recurring: Recurring | null;
  product: Product;
  metadata: Record<string, string>;
}

/**
 * Checkout session parameters.
 */
export interface CheckoutParams {
  priceId: string;
  successUrl: string;
  customerEmail: string;
  customerName?: string;
  customerId?: string;
  metadata?: Record<string, string>;
}

/**
 * Checkout with workspace parameters.
 * Either workspaceId (upgrade existing) or createWorkspace (new) must be provided.
 */
export interface CheckoutWithWorkspaceParams {
  appId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  accessToken: string;
  /** Upgrade existing workspace */
  workspaceId?: string;
  /** Create new workspace */
  createWorkspace?: {
    name: string;
    slug?: string;
  };
}

/**
 * Checkout with workspace response.
 */
export interface CheckoutWithWorkspaceResponse {
  checkoutUrl: string;
  workspaceSlug: string;
  organizationId: string;
}

/**
 * Billing provider interface.
 */
export interface BillingProvider {
  /**
   * Get all entitlements for an entity.
   */
  getEntitlements(
    entityType: string,
    entityId: string,
    productId?: string,
    accessToken?: string,
  ): Promise<EntitlementsResponse | null>;

  /**
   * Check if an entity has a specific entitlement.
   */
  checkEntitlement(
    entityType: string,
    entityId: string,
    productId: string,
    featureKey: string,
    accessToken?: string,
  ): Promise<string | null>;

  /**
   * Get available prices for an app.
   */
  getPrices(appName: string): Promise<Price[]>;

  /**
   * Create a checkout session for a new subscription.
   * @deprecated Use createCheckoutWithWorkspace for new implementations
   */
  createCheckoutSession(params: CheckoutParams): Promise<string>;

  /**
   * Create a checkout session with workspace creation/selection.
   * Routes through Aether for orchestration.
   */
  createCheckoutWithWorkspace(
    params: CheckoutWithWorkspaceParams,
  ): Promise<CheckoutWithWorkspaceResponse>;

  /**
   * Get subscription details for an entity.
   */
  getSubscription(
    entityType: string,
    entityId: string,
    accessToken: string,
  ): Promise<Subscription | null>;

  /**
   * Get billing portal URL for an entity.
   */
  getBillingPortalUrl(
    entityType: string,
    entityId: string,
    productId: string,
    returnUrl: string,
    accessToken: string,
  ): Promise<string>;

  /**
   * Cancel a subscription.
   */
  cancelSubscription(
    entityType: string,
    entityId: string,
    accessToken: string,
  ): Promise<string>;

  /**
   * Renew a subscription (remove scheduled cancellation).
   */
  renewSubscription(
    entityType: string,
    entityId: string,
    accessToken: string,
  ): Promise<void>;

  /**
   * Health check for the provider.
   */
  healthCheck?(): Promise<{ healthy: boolean; message?: string }>;
}

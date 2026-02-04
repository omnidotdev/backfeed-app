import { BILLING_BASE_URL } from "@/lib/config/env.config";
import payments from "@/lib/payments";

import type {
  BillingProvider,
  CheckoutParams,
  CheckoutWithWorkspaceParams,
  CheckoutWithWorkspaceResponse,
  EntitlementsResponse,
  Price,
  Subscription,
} from "./interface";

/**
 * Aether billing provider.
 * Fetches entitlements and manages subscriptions via Aether billing service.
 */
class AetherBillingProvider implements BillingProvider {
  async getEntitlements(
    entityType: string,
    entityId: string,
    productId?: string,
    accessToken?: string,
  ): Promise<EntitlementsResponse | null> {
    if (!BILLING_BASE_URL) {
      return null;
    }

    try {
      const url = new URL(
        `${BILLING_BASE_URL}/entitlements/${entityType}/${entityId}`,
      );
      if (productId) {
        url.searchParams.set("productId", productId);
      }

      const headers: HeadersInit = {};
      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }

      const res = await fetch(url, { headers });

      if (!res.ok) {
        return null;
      }

      return res.json();
    } catch {
      return null;
    }
  }

  async checkEntitlement(
    entityType: string,
    entityId: string,
    productId: string,
    featureKey: string,
    accessToken?: string,
  ): Promise<string | null> {
    const entitlements = await this.getEntitlements(
      entityType,
      entityId,
      productId,
      accessToken,
    );

    if (!entitlements) {
      return null;
    }

    const entitlement = entitlements.entitlements.find(
      (e) => e.featureKey === featureKey,
    );

    return entitlement?.value ?? null;
  }

  async getPrices(appName: string): Promise<Price[]> {
    const prices = await payments.prices.search({
      query: `metadata['app']:'${appName}'`,
      expand: ["data.product"],
    });

    return prices.data
      .filter((p) => p.active)
      .sort((a, b) => (a.unit_amount ?? 0) - (b.unit_amount ?? 0))
      .map((p) => ({
        id: p.id,
        active: p.active,
        currency: p.currency,
        unit_amount: p.unit_amount,
        recurring: p.recurring
          ? {
              interval: p.recurring.interval,
              interval_count: p.recurring.interval_count,
              meter: p.recurring.meter,
              trial_period_days: p.recurring.trial_period_days,
              usage_type: p.recurring.usage_type,
            }
          : null,
        product: {
          id: (p.product as { id: string }).id,
          name: (p.product as { name: string }).name,
          description: (p.product as { description: string | null })
            .description,
          marketing_features: (
            p.product as { marketing_features: Array<{ name: string }> }
          ).marketing_features,
        },
        metadata: p.metadata,
      }));
  }

  async createCheckoutSession(params: CheckoutParams): Promise<string> {
    let customerId = params.customerId;

    if (!customerId) {
      const customer = await payments.customers.create({
        email: params.customerEmail,
        name: params.customerName,
        metadata: params.metadata,
      });
      customerId = customer.id;
    }

    const checkout = await payments.checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      success_url: params.successUrl,
      line_items: [{ price: params.priceId, quantity: 1 }],
      subscription_data: {
        metadata: params.metadata,
      },
    });

    if (!checkout.url) {
      throw new Error("Failed to create checkout session");
    }

    return checkout.url;
  }

  async createCheckoutWithWorkspace(
    params: CheckoutWithWorkspaceParams,
  ): Promise<CheckoutWithWorkspaceResponse> {
    if (!BILLING_BASE_URL) {
      throw new Error("BILLING_BASE_URL not configured");
    }

    const response = await fetch(`${BILLING_BASE_URL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${params.accessToken}`,
      },
      body: JSON.stringify({
        appId: params.appId,
        priceId: params.priceId,
        successUrl: params.successUrl,
        cancelUrl: params.cancelUrl,
        ...(params.workspaceId && { workspaceId: params.workspaceId }),
        ...(params.createWorkspace && {
          createWorkspace: params.createWorkspace,
        }),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `[billing] Checkout failed: ${response.status} ${response.statusText}`,
        errorText,
      );

      let errorMessage = "Failed to create checkout session";
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.error) {
          errorMessage = errorJson.error;
        }
      } catch {
        // Response wasn't JSON
      }

      throw new Error(errorMessage);
    }

    return response.json();
  }

  async getSubscription(
    entityType: string,
    entityId: string,
    accessToken: string,
  ): Promise<Subscription | null> {
    if (!BILLING_BASE_URL) {
      return null;
    }

    try {
      const response = await fetch(
        `${BILLING_BASE_URL}/billing-portal/subscription/${entityType}/${entityId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!response.ok) {
        console.error("Failed to fetch subscription:", await response.text());
        return null;
      }

      const { subscription } = await response.json();
      return subscription;
    } catch {
      return null;
    }
  }

  async getBillingPortalUrl(
    entityType: string,
    entityId: string,
    productId: string,
    returnUrl: string,
    accessToken: string,
  ): Promise<string> {
    if (!BILLING_BASE_URL) {
      throw new Error("BILLING_BASE_URL not configured");
    }

    const response = await fetch(
      `${BILLING_BASE_URL}/billing-portal/${entityType}/${entityId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          productId,
          returnUrl,
        }),
      },
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        (error as { error?: string }).error ||
          "Failed to get billing portal URL",
      );
    }

    const { url } = await response.json();
    return url;
  }

  async cancelSubscription(
    entityType: string,
    entityId: string,
    accessToken: string,
  ): Promise<string> {
    if (!BILLING_BASE_URL) {
      throw new Error("BILLING_BASE_URL not configured");
    }

    const response = await fetch(
      `${BILLING_BASE_URL}/billing-portal/subscription/${entityType}/${entityId}/cancel`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        (error as { error?: string }).error || "Failed to cancel subscription",
      );
    }

    const { id } = await response.json();
    return id;
  }

  async renewSubscription(
    entityType: string,
    entityId: string,
    accessToken: string,
  ): Promise<void> {
    if (!BILLING_BASE_URL) {
      throw new Error("BILLING_BASE_URL not configured");
    }

    const response = await fetch(
      `${BILLING_BASE_URL}/billing-portal/subscription/${entityType}/${entityId}/renew`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        (error as { error?: string }).error || "Failed to renew subscription",
      );
    }
  }

  async healthCheck(): Promise<{ healthy: boolean; message?: string }> {
    if (!BILLING_BASE_URL) {
      return { healthy: false, message: "BILLING_BASE_URL not configured" };
    }

    try {
      const response = await fetch(`${BILLING_BASE_URL}/health`);
      return {
        healthy: response.ok,
        message: response.ok ? "OK" : `Status ${response.status}`,
      };
    } catch (error) {
      return {
        healthy: false,
        message: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export default AetherBillingProvider;

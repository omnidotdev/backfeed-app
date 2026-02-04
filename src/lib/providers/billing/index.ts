import { billingProvider } from "@/lib/config/env.config";
import AetherBillingProvider from "./aether.provider";
import LocalBillingProvider from "./local.provider";

import type { BillingProvider } from "./interface";

export type {
  BillingProvider,
  CheckoutParams,
  Entitlement,
  EntitlementsResponse,
  Price,
  Subscription,
} from "./interface";

/**
 * Create the billing provider based on environment configuration.
 */
const createBillingProvider = (): BillingProvider => {
  switch (billingProvider) {
    case "local":
      return new LocalBillingProvider();
    case "aether":
      return new AetherBillingProvider();
    default:
      console.warn(
        `[billing] Unknown provider "${billingProvider}", using local`,
      );
      return new LocalBillingProvider();
  }
};

/**
 * Singleton billing provider instance.
 */
const billing = createBillingProvider();

export default billing;

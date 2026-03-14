import { createServerFn } from "@tanstack/react-start";

import app from "@/lib/config/app.config";
import payments from "@/lib/payments";

import type Stripe from "stripe";

/**
 * Expand a Stripe Price object (https://docs.stripe.com/api/prices/object) with a Stripe Product object (https://docs.stripe.com/api/products/object).
 */
export interface ExpandedProductPrice extends Stripe.Price {
  product: Stripe.Product;
}

export const getPrices = createServerFn().handler(async () => {
  const prices = await payments.prices.search({
    query: `active:"true" AND metadata["app"]:"${app.name.toLowerCase()}"`,
    expand: ["data.product"],
  });

  // Deduplicate by tier + billing interval (stale Stripe products may coexist)
  const seen = new Set<string>();
  const deduped = prices.data.filter((p) => {
    const tier = p.metadata?.tier ?? "unknown";
    const interval = p.recurring?.interval ?? "one_time";
    const key = `${tier}:${interval}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return deduped.sort(
    (a, b) => a.unit_amount! - b.unit_amount!,
  ) as ExpandedProductPrice[];
});

import { createServerFn } from "@tanstack/react-start";

import billing from "@/lib/providers/billing";

import type { Price } from "@/lib/providers/billing";

export type { Price };

/** @deprecated use Price; kept for existing imports */
export type ExpandedProductPrice = Price;

export const getPrices = createServerFn().handler(async () => {
  const prices = await billing.getPrices("backfeed");

  // Filter to valid tiers only and deduplicate by tier + interval
  const VALID_TIERS = new Set(["free", "pro", "team", "starter"]);
  const seen = new Set<string>();
  const filtered = prices.filter((p) => {
    const tier = p.metadata?.tier;
    if (!tier || !VALID_TIERS.has(tier)) return false;
    const interval = p.recurring?.interval ?? "one_time";
    const key = `${tier}:${interval}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return filtered.sort((a, b) => (a.unit_amount ?? 0) - (b.unit_amount ?? 0));
});

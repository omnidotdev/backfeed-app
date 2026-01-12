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

  return prices.data.sort(
    (a, b) => a.unit_amount! - b.unit_amount!,
  ) as ExpandedProductPrice[];
});

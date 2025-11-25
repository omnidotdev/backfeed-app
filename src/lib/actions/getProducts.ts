"use server";

import { STRIPE_PRODUCT_IDS } from "lib/config";
import { stripe } from "lib/payments/client";

/**
 * Server action to fetch Backfeed stripe product details.
 */
const getProducts = async () => {
  const { data: products } = await stripe.products.list({
    ids: STRIPE_PRODUCT_IDS,
    active: true,
  });

  const pricedProducts = await Promise.all(
    products.map(async (product) => {
      const prices = await stripe.prices.list({
        product: product.id,
        active: true,
      });

      return { ...product, prices: prices.data };
    }),
  );

  const splitProducts = pricedProducts
    .flatMap((product) =>
      product.prices.map((price) => {
        const { prices: _prices, ...rest } = product;

        return { ...rest, price };
      }),
    )
    .sort((a, b) => a.price.unit_amount! - b.price.unit_amount!);

  return splitProducts;
};

export default getProducts;

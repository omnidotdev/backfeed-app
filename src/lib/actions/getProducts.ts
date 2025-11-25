"use server";

import { STRIPE_PRODUCT_IDS } from "lib/config";
import payments from "lib/payments";

/**
 * Server action to fetch Stripe product details.
 */
const getProducts = async () => {
  const { data: products } = await payments.products.list({
    ids: STRIPE_PRODUCT_IDS,
    active: true,
  });

  const pricedProducts = await Promise.all(
    products.map(async (product) => {
      const prices = await payments.prices.list({
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

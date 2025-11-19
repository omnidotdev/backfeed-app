"use server";

import { stripe } from "lib/payments/client";
import { PRODUCT_IDS } from "lib/payments/productIds";

const getProducts = async () => {
  const { data: products } = await stripe.products.list({
    ids: PRODUCT_IDS,
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

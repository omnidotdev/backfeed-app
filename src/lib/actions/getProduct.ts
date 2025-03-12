"use server";

import { polar } from "lib/polar";

/**
 * Server action to get product details.
 */
const getProduct = async (productId: string) =>
  await polar.products.get({
    id: productId,
  });

export default getProduct;

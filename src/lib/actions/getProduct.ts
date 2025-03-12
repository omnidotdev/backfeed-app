"use server";

import { polar } from "lib/polar";

const getProduct = async (productId: string) =>
  await polar.products.get({
    id: productId,
  });

export default getProduct;

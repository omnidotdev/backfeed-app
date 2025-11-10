"use server";

import { getCustomer, getProduct } from "lib/actions";

/**
 * Server action to get details about a user's active subscriptions.
 */
const getSubscriptions = async (userId: string) => {
  const customer = await getCustomer(userId);

  if (!customer.activeSubscriptions.length) {
    throw new Error("No active subscriptions found");
  }

  const subscriptionsWithProduct = await Promise.all(
    customer.activeSubscriptions.map(async (sub) => {
      const product = await getProduct(sub.productId);

      const { productId, ...rest } = sub;

      return {
        ...rest,
        product,
      };
    }),
  );

  return subscriptionsWithProduct;
};

export default getSubscriptions;

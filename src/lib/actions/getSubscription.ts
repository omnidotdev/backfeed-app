"use server";

import { getCustomer, getProduct } from "lib/actions";

/**
 * Server action to get subscription details.
 */
const getSubscription = async (userId: string) => {
  const customer = await getCustomer(userId);

  const product = await getProduct(customer.activeSubscriptions[0].productId);

  const { productId, ...rest } = customer.activeSubscriptions[0];

  return {
    ...rest,
    product,
  };
};

export default getSubscription;

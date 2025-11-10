"use server";

import { getCustomer, getProduct } from "lib/actions";
import { BACKFEED_PRODUCT_IDS } from "lib/polar";

/**
 * Server action to get details about a user's active subscriptions.
 */
const getSubscriptions = async (userId: string) => {
  const customer = await getCustomer(userId);

  if (
    // TODO: determine if there is a better way to do this. Since the Polar organization scope is beyond Backfeed, we have to apply additional checks
    !customer.activeSubscriptions.filter((sub) =>
      BACKFEED_PRODUCT_IDS!.includes(sub.productId),
    ).length
  ) {
    throw new Error("No active Backfeed subscriptions found");
  }

  const subscriptionsWithProduct = await Promise.all(
    customer.activeSubscriptions
      .filter((sub) => BACKFEED_PRODUCT_IDS!.includes(sub.productId))
      .map(async (sub) => {
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

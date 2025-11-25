"use server";

import payments from "lib/payments";

/**
 * Server action to fetch Stripe product details.
 */
const getPrices = async () => {
  const { data: prices } = await payments.prices.search({
    query: 'active:"true" AND metadata["app"]:"backfeed"',
    expand: ["data.product"],
  });

  return prices.sort((a, b) => a.unit_amount! - b.unit_amount!);
};

export default getPrices;

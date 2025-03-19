"use server";

import { polar } from "lib/polar";
import { getAuthSession } from "lib/util";

/**
 * Server action to get customer details.
 */
const getCustomer = async (userId: string) => {
  const session = await getAuthSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return await polar.customers.getStateExternal({
    externalId: userId,
  });
};

export default getCustomer;

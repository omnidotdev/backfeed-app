"use server";

import { auth } from "auth";
import { polar } from "lib/polar";

/**
 * Server action to get customer details.
 */
const getCustomer = async (userId: string) => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return await polar.customers.getStateExternal({
    externalId: userId,
  });
};

export default getCustomer;

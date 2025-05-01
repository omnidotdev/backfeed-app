"use server";

import { auth } from "auth";
import { polar } from "lib/polar";

/**
 * Server action to get customer details.
 */
const getCustomer = async () => {
  const session = await auth();

  if (!session) {
    throw new Error("No customer found");
  }

  return await polar.customers.getStateExternal({
    externalId: session.user?.hidraId!,
  });
};

export default getCustomer;

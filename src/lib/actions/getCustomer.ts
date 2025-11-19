"use server";

import { auth } from "auth";

/**
 * Server action to get customer details.
 */
const getCustomer = async ({ userId }: { userId: string }) => {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthorized");
  }

  // TODO: add logic for stripe integration

  return {};
};

export default getCustomer;

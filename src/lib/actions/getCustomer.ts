"use server";

import { polar } from "lib/polar";

const getCustomer = async (userId: string) =>
  await polar.customers.getStateExternal({
    externalId: userId,
  });

export default getCustomer;

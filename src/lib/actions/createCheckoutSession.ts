"use server";

import { polar } from "lib/polar";

import type { CheckoutCreate } from "@polar-sh/sdk/models/components/checkoutcreate.js";

const createCheckoutSession = async (options: CheckoutCreate) => {
  const session = await polar.checkouts.create(options);

  return session;
};

export default createCheckoutSession;

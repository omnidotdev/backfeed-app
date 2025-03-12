import { Checkout } from "@polar-sh/nextjs";

import { isDevEnv } from "lib/config";

/**
 * Payment checkout route.
 */
export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/confirmation`,
  server: isDevEnv ? "sandbox" : "production",
});

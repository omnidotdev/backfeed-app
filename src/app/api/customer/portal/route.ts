import { CustomerPortal } from "@polar-sh/nextjs";

import { isDevEnv } from "lib/config";

/**
 * Customer portal route.
 */
export const GET = CustomerPortal({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  getCustomerId: async (req) => req.nextUrl.searchParams.get("customerId")!,
  server: isDevEnv ? "sandbox" : "production",
});

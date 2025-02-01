import { CustomerPortal } from "@polar-sh/nextjs";

import { isDevEnv } from "lib/config";

/**
 * Customer portal route.
 * TODO: look into error handling.
 */
export const GET = CustomerPortal({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  getCustomerId: async (request) =>
    request.nextUrl.searchParams.get("customerId")!,
  server: isDevEnv ? "sandbox" : "production",
});

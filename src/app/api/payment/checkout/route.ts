import { Checkout } from "@polar-sh/nextjs";

import { isDevEnv } from "lib/config";

export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  // TODO: adjust accordingly, send to profile page
  successUrl: "/confirmation",
  server: isDevEnv ? "sandbox" : "production",
});

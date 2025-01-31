import { Polar } from "@polar-sh/sdk";

import { isDevEnv } from "lib/config";

/**
 * Polar API client instance.
 */
const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: isDevEnv ? "sandbox" : "production",
});

export default polar;

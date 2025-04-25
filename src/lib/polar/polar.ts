import { Polar } from "@polar-sh/sdk";

import { ENABLE_POLAR_SANDBOX } from "lib/config";

/**
 * Polar SDK client.
 */
const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: ENABLE_POLAR_SANDBOX ? "sandbox" : "production",
});

export default polar;

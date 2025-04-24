import { Polar } from "@polar-sh/sdk";

import { SANDBOX } from "lib/config";

/**
 * Polar SDK client.
 */
const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: SANDBOX ? "sandbox" : "production",
});

export default polar;

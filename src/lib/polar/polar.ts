import { Polar } from "@polar-sh/sdk";

/**
 * Polar API client instance.
 */
const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  // NB: Use this option if you're using the sandbox environment - else use 'production' or omit the parameter
  server: "sandbox",
});

export default polar;

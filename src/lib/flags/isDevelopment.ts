import { flag } from "flags/next";

import { isDevEnv } from "lib/config";

/**
 * Feature flag that determines if the application is running in development mode.
 */
const isDevelopment = flag({
  key: "development-flag",
  decide: () => isDevEnv,
});

export default isDevelopment;

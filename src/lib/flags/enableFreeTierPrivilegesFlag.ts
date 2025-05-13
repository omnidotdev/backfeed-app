import { flag } from "flags/next";

import { isDevEnv } from "lib/config";
import { dedupeSubscription } from "lib/flags/identity";

/**
 * Checks if the user has a free subscription tier or higher.
 */
const enableFreeTierPrivilegesFlag = flag({
  key: "free-tier-privileges-flag",
  identify: dedupeSubscription,
  decide: ({ entities }) => {
    // If we are in a development environment, always return true. Comment out this line to test feature flag behaviors in development.
    if (isDevEnv) return true;

    // NB: If `entities` exist, the user has a subscription.
    return !!entities;
  },
});

export default enableFreeTierPrivilegesFlag;

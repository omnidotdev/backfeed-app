import { flag } from "flags/next";

import { isDevEnv } from "lib/config";
import { dedupeSubscription } from "lib/flags/identity";

/**
 * Checks if the user has a basic subscription tier or higher.
 */
const hasBasicTierPrivileges = flag({
  key: "basic-subscription-flag",
  identify: dedupeSubscription,
  decide: ({ entities }) => {
    // If we are in a development environment, always return true. Comment out this line to test feature flag behaviors in development.
    // TODO: taggle this to true for development
    if (isDevEnv) return false;

    if (!entities) return false;

    // NB: If `entities` exist, the user has a subscription, and therefore has basic tier privileges.
    return true;
  },
});

export default hasBasicTierPrivileges;

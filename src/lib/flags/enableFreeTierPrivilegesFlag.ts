import { flag } from "flags/next";

import { dedupeSubscription } from "lib/flags/identity";

/**
 * Checks if the user has a free subscription tier or higher.
 */
const enableFreeTierPrivilegesFlag = flag({
  key: "free-tier-privileges-flag",
  identify: dedupeSubscription,
  decide: ({ entities }) => !!entities,
});

export default enableFreeTierPrivilegesFlag;

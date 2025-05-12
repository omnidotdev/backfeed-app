import { flag } from "flags/next";

import { Tier } from "generated/graphql.sdk";
import { isDevEnv } from "lib/config";
import { dedupeSubscription } from "lib/flags/identity";

/**
 * Checks if the user has a basic subscription tier or higher.
 */
const enableBasicTierPrivilegesFlag = flag({
  key: "basic-tier-privileges-flag",
  identify: dedupeSubscription,
  decide: ({ entities }) => {
    // If we are in a development environment, always return true. Comment out this line to test feature flag behaviors in development.
    if (isDevEnv) return true;

    // NB: If `entities` exist, the user has a subscription, and we validate that they are not on the free tier.
    return !!entities && entities.product.metadata?.title !== Tier.Free;
  },
});

export default enableBasicTierPrivilegesFlag;

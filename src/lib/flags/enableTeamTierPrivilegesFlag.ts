import { flag } from "flags/next";

import { Tier } from "generated/graphql.sdk";
import { isDevEnv } from "lib/config";
import { dedupeSubscription } from "lib/flags/identity";

/**
 * Checks if the user has a team subscription tier or higher.
 */
const enableTeamTierPrivilegesFlag = flag({
  key: "team-tier-privileges-flag",
  identify: dedupeSubscription,
  decide: ({ entities }) => {
    // If we are in a development environment, always return true. Comment out this line to test feature flag behaviors in development.
    if (isDevEnv) return true;

    if (!entities) return false;

    return ![Tier.Free, Tier.Basic].includes(
      entities.product.metadata?.title as Tier,
    );
  },
});

export default enableTeamTierPrivilegesFlag;

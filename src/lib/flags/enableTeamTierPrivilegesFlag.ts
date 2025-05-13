import { flag } from "flags/next";

import { Tier } from "generated/graphql.sdk";
import { dedupeSubscription } from "lib/flags/identity";

/**
 * Checks if the user has a team subscription tier or higher.
 */
const enableTeamTierPrivilegesFlag = flag({
  key: "team-tier-privileges-flag",
  identify: dedupeSubscription,
  decide: ({ entities }) => {
    if (!entities) return false;

    return ![Tier.Free, Tier.Basic].includes(
      entities.product.metadata?.title as Tier,
    );
  },
});

export default enableTeamTierPrivilegesFlag;

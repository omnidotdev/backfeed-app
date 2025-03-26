import { flag } from "flags/next";

import { isDevEnv } from "lib/config";
import { SubscriptionTier } from "lib/constants";
import { dedupeSubscription } from "lib/flags/identity";

/**
 * Checks if the user has a team subscription tier or higher.
 */
const hasTeamTierPrivileges = flag({
  key: "team-subscription-flag",
  identify: dedupeSubscription,
  decide: ({ entities }) => {
    // If we are in a development environment, always return true. Comment out this line to test feature flag behaviors in development.
    if (isDevEnv) return true;

    if (!entities) return false;

    return entities.product.metadata?.title !== SubscriptionTier.BASIC;
  },
});

export default hasTeamTierPrivileges;

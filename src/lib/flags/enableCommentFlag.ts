import { flag } from "flags/next";

import { Tier } from "generated/graphql.sdk";

const MAX_FREE_TIER_COMMENTS = 100;

/**
 * Checks if feedback is enabled for a project. Based on subscription tier of owner and number of unique users that have provided feedback.
 */
const enableCommentFlag = flag({
  key: "enable-comment-flag",
  decide: ({ entities }) => {
    // If we are in a development environment, always return true. Comment out this line to test feature flag behaviors in development.
    // if (isDevEnv) return true;

    // Validate subscription tier
    if (!entities.subscriptionTier) {
      return false;
    }

    // If the owner of the organization the project is a part of has a free tier subscription, validate the number of total comments (including replies)
    if (entities?.subscriptionTier === Tier.Free) {
      return entities.totalComments < MAX_FREE_TIER_COMMENTS;
    }

    // If the organization owner has a paid subscription, allow unlimited feedback
    return true;
  },
});

export default enableCommentFlag;

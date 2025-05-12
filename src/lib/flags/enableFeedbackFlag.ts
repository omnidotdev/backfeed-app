import { flag } from "flags/next";

import { Tier } from "generated/graphql.sdk";
import { isDevEnv } from "lib/config";

const MAX_UNIQUE_USERS_FOR_FEEDBACK = 15;

/**
 * Checks if feedback is enabled for a project. Based on subscription tier of owner and number of unique users that have provided feedback.
 */
const enableFeedbackFlag = flag({
  key: "enable-feedback-flag",
  decide: ({ entities }) => {
    // If we are in a development environment, always return true. Comment out this line to test feature flag behaviors in development.
    if (isDevEnv) return true;

    // Validate subscription tier
    if (!entities.subscriptionTier) {
      return false;
    }

    // If the owner of the organization the project is a part of has a free tier subscription, validate the number of users that have provided feedback
    if (entities?.subscriptionTier === Tier.Free) {
      return (
        entities.hasUserSubmittedFeedback ||
        entities.activeUserCount < MAX_UNIQUE_USERS_FOR_FEEDBACK
      );
    }

    // If the organization owner has a paid subscription, allow unlimited feedback
    return true;
  },
});

export default enableFeedbackFlag;

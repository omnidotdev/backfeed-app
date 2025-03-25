import { flag } from "flags/next";

import { getSubscription } from "lib/actions";
// import { isDevEnv } from "lib/config";
import { getAuthSession } from "lib/util";

/**
 * Checks if the user has a team subscription.
 */
const hasTeamSubscription = flag({
  key: "team-subscription-flag",
  identify: async () => {
    try {
      const session = await getAuthSession();
      const subscription = await getSubscription(session?.user?.hidraId!);

      return subscription;
    } catch (error) {
      return null;
    }
  },
  decide: ({ entities }) => {
    // If we are in a development environment, always return true
    // if (isDevEnv) return true;

    if (!entities) return false;

    return entities.product.metadata?.title === "team";
  },
});

export default hasTeamSubscription;

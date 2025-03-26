import { dedupe } from "flags/next";

import { getSubscription } from "lib/actions";
import { getAuthSession } from "lib/util";

/**
 * Deduplicated identity helper to fetch the subscription of the current user for feature flags.
 */
const dedupeSubscription = dedupe(async () => {
  try {
    const session = await getAuthSession();
    const subscription = await getSubscription(session?.user?.hidraId!);

    return subscription;
  } catch (error) {
    return null;
  }
});

export default dedupeSubscription;

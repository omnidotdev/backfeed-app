import { dedupe } from "flags/next";

import { getSubscription } from "lib/actions";

/**
 * Deduplicated identity helper to fetch the subscription of the current user for feature flags.
 */
const dedupeSubscription = dedupe(async () => {
  try {
    const subscription = await getSubscription();

    return subscription;
  } catch (error) {
    return null;
  }
});

export default dedupeSubscription;

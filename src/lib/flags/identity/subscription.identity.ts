import { dedupe } from "flags/next";

import { auth } from "auth";
import { getSubscription } from "lib/actions";

/**
 * Deduplicated identity helper to fetch the subscription of the current user for feature flags.
 */
const dedupeSubscription = dedupe(async () => {
  try {
    const session = await auth();
    const subscription = await getSubscription(session?.user?.hidraId!);

    return subscription;
  } catch (error) {
    return null;
  }
});

export default dedupeSubscription;

import { getSdk } from "lib/graphql";
import { getAuthSession } from "lib/util";
import { cache } from "react";

import type { Post } from "generated/graphql";

interface OrganizationOptions {
  /** Feedback ID. */
  feedbackId: Post["rowId"];
}

/**
 * Fetch feedback details. Cached for deduping requests.
 */
const getFeedback = cache(async ({ feedbackId }: OrganizationOptions) => {
  const session = await getAuthSession();

  if (!session) return null;

  const sdk = getSdk({ session });

  const { post: feedback } = await sdk.FeedbackById({ rowId: feedbackId });

  return feedback;
});

export default getFeedback;

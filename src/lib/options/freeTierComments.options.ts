import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { Tier } from "generated/graphql";
import { getFeedback, getProject } from "lib/actions";
import { MAX_FREE_TIER_COMMENTS } from "lib/constants";

import type { Organization, Post, Project } from "generated/graphql";

interface Options {
  /** Organization slug. */
  organizationSlug: Organization["slug"];
  /** Project slug. */
  projectSlug: Project["slug"];
  /** Feedback ID. */
  feedbackId: Post["rowId"];
}

/**
 * Query options for the `FreeTierComments` query.
 */
const freeTierCommentsOptions = ({
  organizationSlug,
  projectSlug,
  feedbackId,
}: Options) =>
  queryOptions({
    queryKey: [
      "FreeTierComments",
      { organizationSlug, projectSlug, feedbackId },
    ],
    queryFn: async () => {
      try {
        const project = await getProject({ organizationSlug, projectSlug });

        if (!project) return null;

        const subscriptionTier =
          project.organization?.members.nodes[0]?.user?.tier;

        const feedback = await getFeedback({ feedbackId });

        return {
          subscriptionTier,
          totalComments: feedback?.comments.totalCount ?? 0,
        };
      } catch (error) {
        return null;
      }
    },
    placeholderData: keepPreviousData,
    select: (data) => {
      if (!data?.subscriptionTier || data?.totalComments == null) {
        return false;
      }

      if (data.subscriptionTier === Tier.Free) {
        return data.totalComments < MAX_FREE_TIER_COMMENTS;
      }

      return true;
    },
  });

export default freeTierCommentsOptions;

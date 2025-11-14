import { keepPreviousData, queryOptions } from "@tanstack/react-query";

import { Tier } from "generated/graphql";
import { getProject } from "lib/actions";
import { MAX_UNIQUE_USERS_FOR_FEEDBACK } from "lib/constants";

import type { Organization, Project } from "generated/graphql";

interface Options {
  /** Organization slug. */
  organizationSlug: Organization["slug"];
  /** Project slug. */
  projectSlug: Project["slug"];
}

/**
 * Query options for the `FreeTierFeedback` query.
 */
const freeTierFeedbackOptions = ({ organizationSlug, projectSlug }: Options) =>
  queryOptions({
    queryKey: ["FreeTierFeedback", { organizationSlug, projectSlug }],
    queryFn: async () => {
      try {
        const project = await getProject({ organizationSlug, projectSlug });

        if (!project) return null;

        const subscriptionTier = project.organization?.tier;

        const activeUserCount = Number(
          project.posts.aggregates?.distinctCount?.userId ?? 0,
        );

        const hasUserSubmittedFeedback = !!project.userPosts.nodes.length;

        return {
          subscriptionTier,
          activeUserCount,
          hasUserSubmittedFeedback,
        };
      } catch (error) {
        return null;
      }
    },
    placeholderData: keepPreviousData,
    select: (data) => {
      if (!data?.subscriptionTier) {
        return false;
      }

      if (data.subscriptionTier === Tier.Free) {
        return (
          data.hasUserSubmittedFeedback ||
          data.activeUserCount < MAX_UNIQUE_USERS_FOR_FEEDBACK
        );
      }

      return true;
    },
  });

export default freeTierFeedbackOptions;

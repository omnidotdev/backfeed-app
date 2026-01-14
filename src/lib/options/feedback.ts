import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";

import {
  useFeedbackByIdQuery,
  useInfinitePostsQuery,
  usePostsQuery,
  useProjectQuery,
} from "@/generated/graphql";

import type {
  FeedbackByIdQueryVariables,
  PostsQueryVariables,
} from "@/generated/graphql";

/** Maximum unique users allowed to submit feedback on free tier */
const MAX_FREE_TIER_UNIQUE_USERS = 15;

export const feedbackByIdOptions = (variables: FeedbackByIdQueryVariables) =>
  queryOptions({
    queryKey: useFeedbackByIdQuery.getKey(variables),
    queryFn: useFeedbackByIdQuery.fetcher(variables),
  });

export const infiniteFeedbackOptions = (variables: PostsQueryVariables) =>
  infiniteQueryOptions({
    queryKey: useInfinitePostsQuery.getKey(variables),
    queryFn: usePostsQuery.fetcher(variables),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.posts?.pageInfo?.hasNextPage
        ? { after: lastPage?.posts?.pageInfo?.endCursor }
        : undefined,
  });

/**
 * Check if user can create feedback based on free tier limits.
 * Free tier organizations (no subscriptionId) have limited unique users.
 */
export const freeTierFeedbackOptions = ({
  organizationId,
  projectSlug,
}: {
  organizationId: string;
  projectSlug: string;
}) =>
  queryOptions({
    queryKey: ["FreeTierFeedback", { organizationId, projectSlug }],
    queryFn: async () => {
      try {
        const { projects } = await useProjectQuery.fetcher({
          organizationId,
          projectSlug,
        })();

        if (!projects?.nodes.length) return null;

        const project = projects.nodes[0];

        const activeUserCount = Number(
          project?.posts.aggregates?.distinctCount?.userId ?? 0,
        );

        const hasUserSubmittedFeedback = !!project?.userPosts.nodes.length;

        return {
          activeUserCount,
          hasUserSubmittedFeedback,
        };
      } catch {
        return null;
      }
    },
    placeholderData: keepPreviousData,
    // For now, allow based on user count - subscription checks should be done at API level
    // This removes the client-side tier check since subscriptionId isn't available in ProjectQuery
    select: (data) => {
      if (!data) return false;

      // Allow if user already submitted feedback, or under user limit
      return (
        data.hasUserSubmittedFeedback ||
        data.activeUserCount < MAX_FREE_TIER_UNIQUE_USERS
      );
    },
  });

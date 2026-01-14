import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";

import {
  useCommentsQuery,
  useFeedbackByIdQuery,
  useInfiniteCommentsQuery,
  useInfiniteRepliesQuery,
  useProjectQuery,
  useRepliesQuery,
} from "@/generated/graphql";

import type {
  CommentsQueryVariables,
  RepliesQueryVariables,
} from "@/generated/graphql";

/** Maximum number of comments allowed on free tier */
const MAX_FREE_TIER_COMMENTS = 100;

export const infiniteCommentsOptions = (variables: CommentsQueryVariables) =>
  infiniteQueryOptions({
    queryKey: useInfiniteCommentsQuery.getKey(variables),
    queryFn: useCommentsQuery.fetcher(variables),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.comments?.pageInfo?.hasNextPage
        ? { after: lastPage?.comments?.pageInfo?.endCursor }
        : undefined,
  });

export const infiniteRepliesOptions = (variables: RepliesQueryVariables) =>
  infiniteQueryOptions({
    queryKey: useInfiniteRepliesQuery.getKey(variables),
    queryFn: useRepliesQuery.fetcher(variables),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.comments?.pageInfo?.hasNextPage
        ? { after: lastPage?.comments?.pageInfo?.endCursor }
        : undefined,
  });

/**
 * Check if user can create comments based on free tier limits.
 * Free tier organizations (no subscriptionId) have limited comments per feedback.
 */
export const freeTierCommentsOptions = ({
  organizationId,
  projectSlug,
  feedbackId,
}: {
  organizationId: string;
  projectSlug: string;
  feedbackId: string;
}) =>
  queryOptions({
    queryKey: ["FreeTierComments", { organizationId, projectSlug, feedbackId }],
    queryFn: async () => {
      try {
        // Get project to verify it exists
        const { projects } = await useProjectQuery.fetcher({
          organizationId,
          projectSlug,
        })();

        if (!projects?.nodes.length) return null;

        const project = projects.nodes[0]!;

        const { post: feedback } = await useFeedbackByIdQuery.fetcher({
          rowId: feedbackId,
        })();

        return {
          organizationId: project.organizationId,
          totalComments: feedback?.commentsWithReplies.totalCount ?? 0,
        };
      } catch {
        return null;
      }
    },
    placeholderData: keepPreviousData,
    // For now, allow all comments - subscription checks should be done at API level
    // This removes the client-side tier check since subscriptionId isn't available in ProjectQuery
    select: (data) => {
      if (!data) return false;
      // Allow if under free tier limit
      return data.totalComments < MAX_FREE_TIER_COMMENTS;
    },
  });

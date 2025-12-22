import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";

import {
  Tier,
  useCommentsQuery,
  useFeedbackByIdQuery,
  useInfiniteCommentsQuery,
  useInfiniteRepliesQuery,
  useProjectQuery,
  useRepliesQuery,
} from "@/generated/graphql";
import MAX_FREE_TIER_COMMENTS from "@/lib/constants/numberOfFreeTierComments.constant";

import type {
  CommentsQueryVariables,
  RepliesQueryVariables,
} from "@/generated/graphql";

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

export const freeTierCommentsOptions = ({
  organizationSlug,
  projectSlug,
  feedbackId,
}: {
  organizationSlug: string;
  projectSlug: string;
  feedbackId: string;
}) =>
  queryOptions({
    queryKey: [
      "FreeTierComments",
      { organizationSlug, projectSlug, feedbackId },
    ],
    queryFn: async () => {
      try {
        const { projects } = await useProjectQuery.fetcher({
          organizationSlug,
          projectSlug,
        })();

        if (!projects?.nodes.length) return null;

        const project = projects.nodes[0]!;

        const subscriptionTier = project.organization?.tier;

        const { post: feedback } = await useFeedbackByIdQuery.fetcher({
          rowId: feedbackId,
        })();

        return {
          subscriptionTier,
          totalComments: feedback?.commentsWithReplies.totalCount ?? 0,
        };
      } catch (_err) {
        return null;
      }
    },
    placeholderData: keepPreviousData,
    select: (data) => {
      if (!data?.subscriptionTier) {
        return false;
      }

      if (data.subscriptionTier === Tier.Free) {
        return data.totalComments < MAX_FREE_TIER_COMMENTS;
      }

      return true;
    },
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

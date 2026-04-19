import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";

import {
  CommentsDocument,
  RepliesDocument,
  useFeedbackByIdQuery,
  useInfiniteCommentsQuery,
  useInfiniteRepliesQuery,
  useProjectQuery,
} from "@/generated/graphql";
import { graphqlFetch } from "@/lib/graphql/graphqlFetch";
import { FeatureKey, checkLimit } from "@/server/functions/entitlements";

import type {
  CommentsQuery,
  CommentsQueryVariables,
  RepliesQuery,
  RepliesQueryVariables,
} from "@/generated/graphql";

/** Maximum number of comments allowed on free tier */
// FALLBACK ONLY -- source of truth is Omni API plan_feature (kind="operational") via Aether entitlements
const MAX_FREE_TIER_COMMENTS = 100;

export const infiniteCommentsOptions = (variables: CommentsQueryVariables) =>
  infiniteQueryOptions({
    queryKey: useInfiniteCommentsQuery.getKey(variables),
    queryFn: (context): Promise<CommentsQuery> =>
      graphqlFetch<CommentsQuery, CommentsQueryVariables>(CommentsDocument, {
        ...variables,
        ...(context.pageParam ?? {}),
      })(),
    initialPageParam: undefined as
      | { after: string | null | undefined }
      | undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.comments?.pageInfo?.hasNextPage
        ? { after: lastPage?.comments?.pageInfo?.endCursor }
        : undefined,
  });

export const infiniteRepliesOptions = (variables: RepliesQueryVariables) =>
  infiniteQueryOptions({
    queryKey: useInfiniteRepliesQuery.getKey(variables),
    queryFn: (context): Promise<RepliesQuery> =>
      graphqlFetch<RepliesQuery, RepliesQueryVariables>(RepliesDocument, {
        ...variables,
        ...(context.pageParam ?? {}),
      })(),
    initialPageParam: undefined as
      | { after: string | null | undefined }
      | undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.comments?.pageInfo?.hasNextPage
        ? { after: lastPage?.comments?.pageInfo?.endCursor }
        : undefined,
  });

/**
 * Check if user can create comments based on entitlement limits.
 * Falls back to hardcoded MAX_FREE_TIER_COMMENTS if Aether is unreachable.
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

        const totalComments = feedback?.commentsWithReplies.totalCount ?? 0;

        // Check entitlement limit via Aether (falls back to hardcoded constant)
        let commentLimit = MAX_FREE_TIER_COMMENTS;

        try {
          const limitResult = await checkLimit({
            data: {
              organizationId: project.organizationId,
              featureKey: FeatureKey.MaxComments,
              currentCount: totalComments,
            },
          });

          commentLimit = limitResult.limit;
        } catch {
          // FALLBACK ONLY -- use hardcoded limit when Aether is unreachable
        }

        return {
          organizationId: project.organizationId,
          totalComments,
          commentLimit,
        };
      } catch {
        return null;
      }
    },
    placeholderData: keepPreviousData,
    select: (data) => {
      if (!data) return false;

      return data.totalComments < data.commentLimit;
    },
  });

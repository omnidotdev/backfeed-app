import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";

import {
  PostsDocument,
  useFeedbackByIdQuery,
  useInfinitePostsQuery,
  useProjectQuery,
} from "@/generated/graphql";
import { graphqlFetch } from "@/lib/graphql/graphqlFetch";
import { FeatureKey, checkLimit } from "@/server/functions/entitlements";

import type {
  FeedbackByIdQueryVariables,
  PostsQuery,
  PostsQueryVariables,
} from "@/generated/graphql";

/** Maximum unique users allowed to submit feedback on free tier */
// FALLBACK ONLY -- source of truth is Omni API plan_feature (kind="operational") via Aether entitlements
const MAX_FREE_TIER_UNIQUE_USERS = 15;

export const feedbackByIdOptions = (variables: FeedbackByIdQueryVariables) =>
  queryOptions({
    queryKey: useFeedbackByIdQuery.getKey(variables),
    queryFn: useFeedbackByIdQuery.fetcher(variables),
  });

export const infiniteFeedbackOptions = (variables: PostsQueryVariables) =>
  infiniteQueryOptions({
    queryKey: useInfinitePostsQuery.getKey(variables),
    queryFn: (context): Promise<PostsQuery> =>
      graphqlFetch<PostsQuery, PostsQueryVariables>(PostsDocument, {
        ...variables,
        ...(context.pageParam ?? {}),
      })(),
    initialPageParam: undefined as
      | { after: string | null | undefined }
      | undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.posts?.pageInfo?.hasNextPage
        ? { after: lastPage?.posts?.pageInfo?.endCursor }
        : undefined,
  });

/**
 * Check if user can create feedback based on entitlement limits.
 * Falls back to hardcoded MAX_FREE_TIER_UNIQUE_USERS if Aether is unreachable.
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

        // Check entitlement limit via Aether (falls back to hardcoded constant)
        let userLimit = MAX_FREE_TIER_UNIQUE_USERS;

        try {
          const limitResult = await checkLimit({
            data: {
              organizationId,
              featureKey: FeatureKey.MaxUniqueUsers,
              currentCount: activeUserCount,
            },
          });

          userLimit = limitResult.limit;
        } catch {
          // FALLBACK ONLY -- use hardcoded limit when Aether is unreachable
        }

        return {
          activeUserCount,
          hasUserSubmittedFeedback,
          userLimit,
        };
      } catch {
        return null;
      }
    },
    placeholderData: keepPreviousData,
    select: (data) => {
      if (!data) return false;

      // Allow if user already submitted feedback, or under user limit
      return (
        data.hasUserSubmittedFeedback || data.activeUserCount < data.userLimit
      );
    },
  });

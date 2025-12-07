import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";

import {
  Tier,
  useFeedbackByIdQuery,
  useInfinitePostsQuery,
  usePostsQuery,
  useProjectQuery,
} from "@/generated/graphql";
import MAX_UNIQUE_USERS_FOR_FEEDBACK from "@/lib/constants/numberOfFreeTierUniqueUsers.constant";

import type {
  FeedbackByIdQueryVariables,
  PostsQueryVariables,
} from "@/generated/graphql";

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

export const freeTierFeedbackOptions = ({
  organizationSlug,
  projectSlug,
}: {
  organizationSlug: string;
  projectSlug: string;
}) =>
  queryOptions({
    queryKey: ["FreeTierFeedback", { organizationSlug, projectSlug }],
    queryFn: async () => {
      try {
        const { projects } = await useProjectQuery.fetcher({
          organizationSlug,
          projectSlug,
        })();

        if (!projects?.nodes.length) return null;

        const project = projects.nodes[0];

        const subscriptionTier = project?.organization?.tier;

        const activeUserCount = Number(
          project?.posts.aggregates?.distinctCount?.userId ?? 0,
        );

        const hasUserSubmittedFeedback = !!project?.userPosts.nodes.length;

        return {
          subscriptionTier,
          activeUserCount,
          hasUserSubmittedFeedback,
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

      // NB: If the organization is on the `free` tier, then there is a maximum of 15 unique users that are allowed to provide feedback.
      // This first checks if the user has already provided feedback (if so, allow user to submit more feedback), and then checks against the total number of unique users to provide feedback
      if (data.subscriptionTier === Tier.Free) {
        return (
          data.hasUserSubmittedFeedback ||
          data.activeUserCount < MAX_UNIQUE_USERS_FOR_FEEDBACK
        );
      }

      return true;
    },
  });

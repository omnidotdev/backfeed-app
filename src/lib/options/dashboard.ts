import { infiniteQueryOptions } from "@tanstack/react-query";

import {
  RecentFeedbackDocument,
  useInfiniteRecentFeedbackQuery,
} from "@/generated/graphql";
import { graphqlFetch } from "@/lib/graphql/graphqlFetch";

import type {
  RecentFeedbackQuery,
  RecentFeedbackQueryVariables,
} from "@/generated/graphql";

export const recentFeedbackOptions = (
  variables: RecentFeedbackQueryVariables,
) =>
  infiniteQueryOptions({
    queryKey: useInfiniteRecentFeedbackQuery.getKey(variables),
    queryFn: (context): Promise<RecentFeedbackQuery> =>
      graphqlFetch<RecentFeedbackQuery, RecentFeedbackQueryVariables>(
        RecentFeedbackDocument,
        { ...variables, ...(context.pageParam ?? {}) },
      )(),
    initialPageParam: undefined as
      | { after: string | null | undefined }
      | undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.posts?.pageInfo?.hasNextPage
        ? { after: lastPage?.posts?.pageInfo?.endCursor }
        : undefined,
  });

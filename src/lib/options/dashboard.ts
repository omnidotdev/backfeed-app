import { infiniteQueryOptions } from "@tanstack/react-query";

import {
  useInfiniteRecentFeedbackQuery,
  useRecentFeedbackQuery,
} from "@/generated/graphql";

import type { RecentFeedbackQueryVariables } from "@/generated/graphql";

export const recentFeedbackOptions = (
  variables: RecentFeedbackQueryVariables,
) =>
  infiniteQueryOptions({
    queryKey: useInfiniteRecentFeedbackQuery.getKey(variables),
    queryFn: useRecentFeedbackQuery.fetcher(variables),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.posts?.pageInfo?.hasNextPage
        ? { after: lastPage?.posts?.pageInfo?.endCursor }
        : undefined,
  });

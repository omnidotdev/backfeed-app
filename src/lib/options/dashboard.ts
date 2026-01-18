import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import {
  useDashboardMetricsQuery,
  useInfiniteRecentFeedbackQuery,
  useRecentFeedbackQuery,
} from "@/generated/graphql";

import type {
  DashboardMetricsQueryVariables,
  RecentFeedbackQueryVariables,
} from "@/generated/graphql";

export const dashboardMetricsOptions = (
  variables: DashboardMetricsQueryVariables,
) =>
  queryOptions({
    queryKey: useDashboardMetricsQuery.getKey(variables),
    queryFn: useDashboardMetricsQuery.fetcher(variables),
  });

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

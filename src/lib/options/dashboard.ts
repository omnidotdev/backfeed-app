import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import {
  useDashboardAggregatesQuery,
  useInfiniteRecentFeedbackQuery,
  useRecentFeedbackQuery,
  useWeeklyFeedbackQuery,
} from "@/generated/graphql";

import type {
  DashboardAggregatesQueryVariables,
  RecentFeedbackQueryVariables,
  WeeklyFeedbackQueryVariables,
} from "@/generated/graphql";

export const dashboardAggregatesOptions = (
  variables: DashboardAggregatesQueryVariables,
) =>
  queryOptions({
    queryKey: useDashboardAggregatesQuery.getKey(variables),
    queryFn: useDashboardAggregatesQuery.fetcher(variables),
  });

export const weeklyFeedbackOptions = (
  variables: WeeklyFeedbackQueryVariables,
) =>
  queryOptions({
    queryKey: useWeeklyFeedbackQuery.getKey(variables),
    queryFn: useWeeklyFeedbackQuery.fetcher(variables),
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

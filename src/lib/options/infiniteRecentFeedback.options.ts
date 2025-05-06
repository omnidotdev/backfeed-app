import { infiniteQueryOptions } from "@tanstack/react-query";

import { useRecentFeedbackQuery } from "generated/graphql";

import type { RecentFeedbackQueryVariables } from "generated/graphql";

const recentFeedbackOptions = (variables: RecentFeedbackQueryVariables) =>
  infiniteQueryOptions({
    queryKey: useRecentFeedbackQuery.getKey(variables),
    queryFn: useRecentFeedbackQuery.fetcher(variables),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.posts?.pageInfo?.hasNextPage
        ? { after: lastPage?.posts?.pageInfo?.endCursor }
        : undefined,
  });

export default recentFeedbackOptions;

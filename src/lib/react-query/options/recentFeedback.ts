import { queryOptions } from "@tanstack/react-query";

import { useRecentFeedbackQuery } from "generated/graphql";

import type { RecentFeedbackQueryVariables } from "generated/graphql";

const recentFeedbackQueryOptions = (variables: RecentFeedbackQueryVariables) =>
  queryOptions({
    queryKey: useRecentFeedbackQuery.getKey(variables),
    queryFn: useRecentFeedbackQuery.fetcher(variables),
    select: (data) => data?.posts?.nodes,
  });

export default recentFeedbackQueryOptions;

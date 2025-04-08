import { queryOptions } from "@tanstack/react-query";

import { useWeeklyFeedbackQuery } from "generated/graphql";

import type { WeeklyFeedbackQueryVariables } from "generated/graphql";

const weeklyFeedbackQueryOptions = (variables: WeeklyFeedbackQueryVariables) =>
  queryOptions({
    queryKey: useWeeklyFeedbackQuery.getKey(variables),
    queryFn: useWeeklyFeedbackQuery.fetcher(variables),
  });

export default weeklyFeedbackQueryOptions;

import { queryOptions } from "@tanstack/react-query";
import dayjs from "dayjs";

import { useWeeklyFeedbackQuery } from "generated/graphql";

import type { WeeklyFeedbackQueryVariables } from "generated/graphql";

const weeklyFeedbackQueryOptions = (variables: WeeklyFeedbackQueryVariables) =>
  queryOptions({
    queryKey: useWeeklyFeedbackQuery.getKey(variables),
    queryFn: useWeeklyFeedbackQuery.fetcher(variables),
    select: (data) =>
      data?.posts?.groupedAggregates?.map((aggregate) => ({
        name: dayjs(aggregate.keys?.[0]).format("ddd"),
        total: Number(aggregate.distinctCount?.rowId),
      })),
  });

export default weeklyFeedbackQueryOptions;

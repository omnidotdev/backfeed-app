import { queryOptions } from "@tanstack/react-query";

import { useDashboardAggregatesQuery } from "generated/graphql";

import type { DashboardAggregatesQueryVariables } from "generated/graphql";

const dashboardAggregatesQueryOptions = (
  variables: DashboardAggregatesQueryVariables
) =>
  queryOptions({
    queryKey: useDashboardAggregatesQuery.getKey(variables),
    queryFn: useDashboardAggregatesQuery.fetcher(variables),
    select: (data) => ({
      totalFeedback: data?.posts?.totalCount ?? 0,
      totalUsers: data?.users?.totalCount ?? 0,
    }),
  });

export default dashboardAggregatesQueryOptions;

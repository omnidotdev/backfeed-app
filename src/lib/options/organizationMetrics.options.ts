import { queryOptions } from "@tanstack/react-query";

import { useOrganizationMetricsQuery } from "generated/graphql";

import type { OrganizationMetricsQueryVariables } from "generated/graphql";

const organizationMetricsOptions = (
  variables: OrganizationMetricsQueryVariables,
) =>
  queryOptions({
    queryKey: useOrganizationMetricsQuery.getKey(variables),
    queryFn: useOrganizationMetricsQuery.fetcher(variables),
    select: (data) => ({
      totalProjects: data?.projects?.totalCount,
      totalFeedback: data?.posts?.totalCount,
      activeUsers: data?.members?.totalCount,
    }),
  });

export default organizationMetricsOptions;

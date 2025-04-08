import { queryOptions } from "@tanstack/react-query";

import { useOrganizationMetricsQuery } from "generated/graphql";

import type { OrganizationMetricsQueryVariables } from "generated/graphql";

const organizationMetricsQueryOptions = (
  variables: OrganizationMetricsQueryVariables
) =>
  queryOptions({
    queryKey: useOrganizationMetricsQuery.getKey(variables),
    queryFn: useOrganizationMetricsQuery.fetcher(variables),
  });

export default organizationMetricsQueryOptions;

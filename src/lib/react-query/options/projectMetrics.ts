import { queryOptions } from "@tanstack/react-query";

import { useProjectMetricsQuery } from "generated/graphql";

import type { ProjectMetricsQueryVariables } from "generated/graphql";

const projectMetricsQueryOptions = (variables: ProjectMetricsQueryVariables) =>
  queryOptions({
    queryKey: useProjectMetricsQuery.getKey(variables),
    queryFn: useProjectMetricsQuery.fetcher(variables),
  });

export default projectMetricsQueryOptions;

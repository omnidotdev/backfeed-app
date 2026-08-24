import { queryOptions } from "@tanstack/react-query";

import { useWorkspaceMetricsQuery } from "@/generated/graphql";

import type { WorkspaceMetricsQueryVariables } from "@/generated/graphql";

export const workspaceMetricsOptions = (
  variables: WorkspaceMetricsQueryVariables,
) =>
  queryOptions({
    queryKey: useWorkspaceMetricsQuery.getKey(variables),
    queryFn: useWorkspaceMetricsQuery.fetcher(variables),
  });

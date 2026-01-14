import { queryOptions } from "@tanstack/react-query";

import {
  useWorkspaceMetricsQuery,
  useWorkspaceQuery,
} from "@/generated/graphql";

import type {
  WorkspaceMetricsQueryVariables,
  WorkspaceQueryVariables,
} from "@/generated/graphql";

export const workspaceOptions = (variables: WorkspaceQueryVariables) =>
  queryOptions({
    queryKey: useWorkspaceQuery.getKey(variables),
    queryFn: useWorkspaceQuery.fetcher(variables),
  });

export const workspaceMetricsOptions = (
  variables: WorkspaceMetricsQueryVariables,
) =>
  queryOptions({
    queryKey: useWorkspaceMetricsQuery.getKey(variables),
    queryFn: useWorkspaceMetricsQuery.fetcher(variables),
  });

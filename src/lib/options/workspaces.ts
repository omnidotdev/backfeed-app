import { queryOptions } from "@tanstack/react-query";

import {
  useWorkspaceMetricsQuery,
  useWorkspaceQuery,
  useWorkspaceRoleQuery,
  useWorkspacesQuery,
} from "@/generated/graphql";

import type {
  WorkspaceMetricsQueryVariables,
  WorkspaceQueryVariables,
  WorkspaceRoleQueryVariables,
  WorkspacesQueryVariables,
} from "@/generated/graphql";

export const workspacesOptions = (variables: WorkspacesQueryVariables) =>
  queryOptions({
    queryKey: useWorkspacesQuery.getKey(variables),
    queryFn: useWorkspacesQuery.fetcher(variables),
  });

export const workspaceOptions = (variables: WorkspaceQueryVariables) =>
  queryOptions({
    queryKey: useWorkspaceQuery.getKey(variables),
    queryFn: useWorkspaceQuery.fetcher(variables),
  });

export const workspaceRoleOptions = (variables: WorkspaceRoleQueryVariables) =>
  queryOptions({
    queryKey: useWorkspaceRoleQuery.getKey(variables),
    queryFn: useWorkspaceRoleQuery.fetcher(variables),
  });

export const workspaceMetricsOptions = (
  variables: WorkspaceMetricsQueryVariables,
) =>
  queryOptions({
    queryKey: useWorkspaceMetricsQuery.getKey(variables),
    queryFn: useWorkspaceMetricsQuery.fetcher(variables),
  });

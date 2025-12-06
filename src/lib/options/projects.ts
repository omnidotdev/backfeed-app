import { queryOptions } from "@tanstack/react-query";

import {
  useProjectMetricsQuery,
  useProjectQuery,
  useProjectStatusesQuery,
  useProjectsQuery,
  useStatusBreakdownQuery,
} from "@/generated/graphql";

import type {
  ProjectMetricsQueryVariables,
  ProjectQueryVariables,
  ProjectStatusesQueryVariables,
  ProjectsQueryVariables,
  StatusBreakdownQueryVariables,
} from "@/generated/graphql";

export const projectsOptions = (variables: ProjectsQueryVariables) =>
  queryOptions({
    queryKey: useProjectsQuery.getKey(variables),
    queryFn: useProjectsQuery.fetcher(variables),
  });

export const projectOptions = (variables: ProjectQueryVariables) =>
  queryOptions({
    queryKey: useProjectQuery.getKey(variables),
    queryFn: useProjectQuery.fetcher(variables),
  });

export const projectStatusesOptions = (
  variables: ProjectStatusesQueryVariables,
) =>
  queryOptions({
    queryKey: useProjectStatusesQuery.getKey(variables),
    queryFn: useProjectStatusesQuery.fetcher(variables),
  });

export const statusBreakdownOptions = (
  variables: StatusBreakdownQueryVariables,
) =>
  queryOptions({
    queryKey: useStatusBreakdownQuery.getKey(variables),
    queryFn: useStatusBreakdownQuery.fetcher(variables),
  });

export const projectMetricsOptions = (
  variables: ProjectMetricsQueryVariables,
) =>
  queryOptions({
    queryKey: useProjectMetricsQuery.getKey(variables),
    queryFn: useProjectMetricsQuery.fetcher(variables),
  });

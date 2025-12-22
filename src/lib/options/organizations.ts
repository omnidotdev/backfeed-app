import { queryOptions } from "@tanstack/react-query";

import {
  useOrganizationMetricsQuery,
  useOrganizationQuery,
  useOrganizationRoleQuery,
  useOrganizationsQuery,
} from "@/generated/graphql";

import type {
  OrganizationMetricsQueryVariables,
  OrganizationQueryVariables,
  OrganizationRoleQueryVariables,
  OrganizationsQueryVariables,
} from "@/generated/graphql";

export const organizationsOptions = (variables: OrganizationsQueryVariables) =>
  queryOptions({
    queryKey: useOrganizationsQuery.getKey(variables),
    queryFn: useOrganizationsQuery.fetcher(variables),
  });

export const organizationOptions = (variables: OrganizationQueryVariables) =>
  queryOptions({
    queryKey: useOrganizationQuery.getKey(variables),
    queryFn: useOrganizationQuery.fetcher(variables),
  });

export const organizationRoleOptions = (
  variables: OrganizationRoleQueryVariables,
) =>
  queryOptions({
    queryKey: useOrganizationRoleQuery.getKey(variables),
    queryFn: useOrganizationRoleQuery.fetcher(variables),
  });

export const organizationMetricsOptions = (
  variables: OrganizationMetricsQueryVariables,
) =>
  queryOptions({
    queryKey: useOrganizationMetricsQuery.getKey(variables),
    queryFn: useOrganizationMetricsQuery.fetcher(variables),
  });

import { queryOptions } from "@tanstack/react-query";

import { useOrganizationRoleQuery } from "generated/graphql";

import type { OrganizationRoleQueryVariables } from "generated/graphql";

const organizationRoleQueryOptions = (
  variables: OrganizationRoleQueryVariables
) =>
  queryOptions({
    queryKey: useOrganizationRoleQuery.getKey(variables),
    queryFn: useOrganizationRoleQuery.fetcher(variables),
    select: (data) => data.memberByUserIdAndOrganizationId,
    enabled: !!variables.userId && !!variables.organizationId,
  });

export default organizationRoleQueryOptions;

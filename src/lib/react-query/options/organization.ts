import { queryOptions } from "@tanstack/react-query";

import { useOrganizationQuery } from "generated/graphql";

import type { OrganizationQueryVariables } from "generated/graphql";

const organizationQueryOptions = (variables: OrganizationQueryVariables) =>
  queryOptions({
    queryKey: useOrganizationQuery.getKey(variables),
    queryFn: useOrganizationQuery.fetcher(variables),
  });

export default organizationQueryOptions;

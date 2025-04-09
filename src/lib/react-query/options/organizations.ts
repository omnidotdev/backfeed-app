import { queryOptions } from "@tanstack/react-query";

import { useOrganizationsQuery } from "generated/graphql";

import type { OrganizationsQueryVariables } from "generated/graphql";

const organizationsQueryOptions = (variables: OrganizationsQueryVariables) =>
  queryOptions({
    queryKey: useOrganizationsQuery.getKey(variables),
    queryFn: useOrganizationsQuery.fetcher(variables),
    select: (data) => data?.organizations?.nodes,
  });

export default organizationsQueryOptions;

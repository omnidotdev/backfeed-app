import { queryOptions } from "@tanstack/react-query";

import { useOrganizationsQuery } from "generated/graphql";

import type { OrganizationsQueryVariables } from "generated/graphql";

const organizationsQueryOptions = (variables: OrganizationsQueryVariables) =>
  queryOptions({
    queryKey: useOrganizationsQuery.getKey(variables),
    queryFn: useOrganizationsQuery.fetcher(variables),
  });

export default organizationsQueryOptions;

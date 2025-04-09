import { queryOptions } from "@tanstack/react-query";

import { useUserQuery } from "generated/graphql";

import type { UserQueryVariables } from "generated/graphql";

const userQueryOptions = (variables: UserQueryVariables) =>
  queryOptions({
    queryKey: useUserQuery.getKey(variables),
    queryFn: useUserQuery.fetcher(variables),
    enabled: !!variables.hidraId,
    select: (data) => data?.userByHidraId,
  });

export default userQueryOptions;

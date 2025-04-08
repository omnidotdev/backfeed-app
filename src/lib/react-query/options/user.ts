import { queryOptions } from "@tanstack/react-query";

import { useUserQuery } from "generated/graphql";

import type { UserQueryVariables } from "generated/graphql";

const userQueryOptions = (variables: UserQueryVariables) =>
  queryOptions({
    queryKey: useUserQuery.getKey(variables),
    queryFn: useUserQuery.fetcher(variables),
  });

export default userQueryOptions;

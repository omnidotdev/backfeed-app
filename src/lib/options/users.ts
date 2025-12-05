import { queryOptions } from "@tanstack/react-query";

import { useUserQuery } from "@/generated/graphql";

import type { UserQueryVariables } from "@/generated/graphql";

export const usersOptions = (variables: UserQueryVariables) =>
  queryOptions({
    queryKey: useUserQuery.getKey(variables),
    queryFn: useUserQuery.fetcher(variables),
  });

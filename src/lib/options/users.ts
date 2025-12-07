import { queryOptions } from "@tanstack/react-query";

import { useUserQuery } from "@/generated/graphql";

import type { UserQueryVariables } from "@/generated/graphql";

export const userOptions = (variables: UserQueryVariables) =>
  queryOptions({
    queryKey: useUserQuery.getKey(variables),
    queryFn: useUserQuery.fetcher(variables),
  });

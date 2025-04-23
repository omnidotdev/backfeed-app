import { queryOptions } from "@tanstack/react-query";

import { useMembersQuery } from "generated/graphql";

import type { MembersQueryVariables } from "generated/graphql";

const membersOptions = (variables: MembersQueryVariables) =>
  queryOptions({
    queryKey: useMembersQuery.getKey(variables),
    queryFn: useMembersQuery.fetcher(variables),
    select: (data) => data.members?.nodes ?? [],
  });

export default membersOptions;

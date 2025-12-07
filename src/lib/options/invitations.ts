import { queryOptions } from "@tanstack/react-query";

import { useInvitationsQuery } from "@/generated/graphql";

import type { InvitationsQueryVariables } from "@/generated/graphql";

export const invitationsOptions = (variables: InvitationsQueryVariables) =>
  queryOptions({
    queryKey: useInvitationsQuery.getKey(variables),
    queryFn: useInvitationsQuery.fetcher(variables),
  });

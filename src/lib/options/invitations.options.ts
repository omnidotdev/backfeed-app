import { queryOptions } from "@tanstack/react-query";

import { useInvitationsQuery } from "generated/graphql";

import type { InvitationsQueryVariables } from "generated/graphql";

const invitationsOptions = (variables: InvitationsQueryVariables) =>
  queryOptions({
    queryKey: useInvitationsQuery.getKey(variables),
    queryFn: useInvitationsQuery.fetcher(variables),
    select: (data) => data?.invitations,
  });

export default invitationsOptions;

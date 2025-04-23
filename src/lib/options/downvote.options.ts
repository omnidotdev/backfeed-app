import { queryOptions } from "@tanstack/react-query";

import { useDownvoteQuery } from "generated/graphql";

import type { DownvoteQueryVariables } from "generated/graphql";

const downvoteOptions = (variables: DownvoteQueryVariables) =>
  queryOptions({
    queryKey: useDownvoteQuery.getKey(variables),
    queryFn: useDownvoteQuery.fetcher(variables),
    select: (data) => data?.downvoteByPostIdAndUserId,
  });

export default downvoteOptions;

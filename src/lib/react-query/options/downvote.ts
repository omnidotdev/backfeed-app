import { queryOptions } from "@tanstack/react-query";

import { useDownvoteQuery } from "generated/graphql";

import type { DownvoteQueryVariables } from "generated/graphql";

const downvoteQueryOptions = (variables: DownvoteQueryVariables) =>
  queryOptions({
    queryKey: useDownvoteQuery.getKey(variables),
    queryFn: useDownvoteQuery.fetcher(variables),
  });

export default downvoteQueryOptions;

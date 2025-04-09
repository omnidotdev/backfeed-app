import { queryOptions } from "@tanstack/react-query";

import { useUpvoteQuery } from "generated/graphql";

import type { UpvoteQueryVariables } from "generated/graphql";

const upvoteQueryOptions = (variables: UpvoteQueryVariables) =>
  queryOptions({
    queryKey: useUpvoteQuery.getKey(variables),
    queryFn: useUpvoteQuery.fetcher(variables),
    select: (data) => data?.upvoteByPostIdAndUserId,
  });

export default upvoteQueryOptions;

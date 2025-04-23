import { infiniteQueryOptions } from "@tanstack/react-query";

import { useCommentsQuery, useInfiniteCommentsQuery } from "generated/graphql";

import type { CommentsQueryVariables } from "generated/graphql";

const infiniteCommentsOptions = (variables: CommentsQueryVariables) =>
  infiniteQueryOptions({
    queryKey: useInfiniteCommentsQuery.getKey(variables),
    queryFn: useCommentsQuery.fetcher(variables),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.comments?.pageInfo?.hasNextPage
        ? { after: lastPage?.comments?.pageInfo?.endCursor }
        : undefined,
  });

export default infiniteCommentsOptions;

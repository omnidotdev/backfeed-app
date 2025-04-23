import { infiniteQueryOptions } from "@tanstack/react-query";

import { useInfinitePostsQuery, usePostsQuery } from "generated/graphql";

import type { PostsQueryVariables } from "generated/graphql";

const infinitePostsOptions = (variables: PostsQueryVariables) =>
  infiniteQueryOptions({
    queryKey: useInfinitePostsQuery.getKey(variables),
    queryFn: usePostsQuery.fetcher(variables),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.posts?.pageInfo?.hasNextPage
        ? { after: lastPage?.posts?.pageInfo?.endCursor }
        : undefined,
  });

export default infinitePostsOptions;

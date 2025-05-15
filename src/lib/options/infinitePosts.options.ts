import { infiniteQueryOptions } from "@tanstack/react-query";

import {
  PostOrderBy,
  useInfinitePostsQuery,
  usePostsQuery,
} from "generated/graphql";

import type { PostsQueryVariables } from "generated/graphql";

interface Options extends Omit<PostsQueryVariables, "orderBy"> {
  /* Authenticated user ID. */
  userId: PostsQueryVariables["userId"];
  /** Order by option for posts. Derived from search parameters. */
  orderBy: string | null;
}

/**
 * Options for the infinite posts query.
 */
const infinitePostsOptions = (options: Options) => {
  const variables: PostsQueryVariables = {
    ...options,
    orderBy: options.orderBy
      ? [options.orderBy as PostOrderBy, PostOrderBy.CreatedAtDesc]
      : undefined,
  };

  return infiniteQueryOptions({
    queryKey: useInfinitePostsQuery.getKey(variables),
    queryFn: usePostsQuery.fetcher(variables),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.posts?.pageInfo?.hasNextPage
        ? { after: lastPage?.posts?.pageInfo?.endCursor }
        : undefined,
  });
};

export default infinitePostsOptions;

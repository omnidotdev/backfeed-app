import { infiniteQueryOptions } from "@tanstack/react-query";

import {
  useCommentsQuery,
  useInfiniteCommentsQuery,
  useInfiniteRepliesQuery,
  useRepliesQuery,
} from "@/generated/graphql";

import type {
  CommentsQueryVariables,
  RepliesQueryVariables,
} from "@/generated/graphql";

export const infiniteCommentsOptions = (variables: CommentsQueryVariables) =>
  infiniteQueryOptions({
    queryKey: useInfiniteCommentsQuery.getKey(variables),
    queryFn: useCommentsQuery.fetcher(variables),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.comments?.pageInfo?.hasNextPage
        ? { after: lastPage?.comments?.pageInfo?.endCursor }
        : undefined,
  });

export const infiniteRepliesOptions = (variables: RepliesQueryVariables) =>
  infiniteQueryOptions({
    queryKey: useInfiniteRepliesQuery.getKey(variables),
    queryFn: useRepliesQuery.fetcher(variables),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.comments?.pageInfo?.hasNextPage
        ? { after: lastPage?.comments?.pageInfo?.endCursor }
        : undefined,
  });

import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

import {
  useFeedbackByIdQuery,
  useInfinitePostsQuery,
  usePostsQuery,
} from "@/generated/graphql";

import type {
  FeedbackByIdQueryVariables,
  PostsQueryVariables,
} from "@/generated/graphql";

export const feedbackByIdOptions = (variables: FeedbackByIdQueryVariables) =>
  queryOptions({
    queryKey: useFeedbackByIdQuery.getKey(variables),
    queryFn: useFeedbackByIdQuery.fetcher(variables),
  });

export const infiniteFeedbackOptions = (variables: PostsQueryVariables) =>
  infiniteQueryOptions({
    queryKey: useInfinitePostsQuery.getKey(variables),
    queryFn: usePostsQuery.fetcher(variables),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage?.posts?.pageInfo?.hasNextPage
        ? { after: lastPage?.posts?.pageInfo?.endCursor }
        : undefined,
  });

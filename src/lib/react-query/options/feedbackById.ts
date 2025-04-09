import { queryOptions } from "@tanstack/react-query";

import { useFeedbackByIdQuery } from "generated/graphql";

import type { FeedbackByIdQueryVariables } from "generated/graphql";

const feedbackByIdQueryOptions = (variables: FeedbackByIdQueryVariables) =>
  queryOptions({
    queryKey: useFeedbackByIdQuery.getKey(variables),
    queryFn: useFeedbackByIdQuery.fetcher(variables),
    select: (data) => data?.post,
  });

export default feedbackByIdQueryOptions;

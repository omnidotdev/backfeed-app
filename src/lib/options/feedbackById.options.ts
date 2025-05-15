import { queryOptions } from "@tanstack/react-query";

import { useFeedbackByIdQuery } from "generated/graphql";

import type { FeedbackByIdQueryVariables } from "generated/graphql";

interface Options extends FeedbackByIdQueryVariables {
  /* Authenticated user ID. */
  userId: FeedbackByIdQueryVariables["userId"];
}

/**
 * Options for the feedback by ID query.
 */
const feedbackByIdOptions = (options: Options) =>
  queryOptions({
    queryKey: useFeedbackByIdQuery.getKey(options),
    queryFn: useFeedbackByIdQuery.fetcher(options),
    select: (data) => data?.post,
  });

export default feedbackByIdOptions;

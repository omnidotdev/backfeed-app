import { request } from "graphql-request";

import { FeedbackByIdDocument } from "generated/graphql";
import { API_BASE_URL } from "lib/config";

import type {
  FeedbackByIdQuery,
  FeedbackByIdQueryVariables,
} from "generated/graphql";

/**
 * Get a feedback record by its ID. This is used to fetch the feedback details server-side.
 */
const getFeedbackById = async (
  feedbackId: string
): Promise<FeedbackByIdQuery> =>
  request({
    url: API_BASE_URL!,
    document: FeedbackByIdDocument,
    variables: { rowId: feedbackId } as FeedbackByIdQueryVariables,
  });

export default getFeedbackById;

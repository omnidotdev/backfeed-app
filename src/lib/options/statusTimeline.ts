import { queryOptions } from "@tanstack/react-query";

import { graphqlFetch } from "@/lib/graphql/graphqlFetch";

/** A single status transition in a post's timeline. */
export interface StatusChange {
  rowId: string;
  createdAt: string;
  toStatusTemplate: {
    displayName: string;
    color: string | null;
  } | null;
  changedBy: {
    username: string | null;
    avatarUrl: string | null;
  } | null;
}

interface StatusTimelineData {
  post: {
    rowId: string;
    postStatusChanges: { nodes: StatusChange[] };
  } | null;
}

// raw document (no codegen needed); the API exposes the read-only timeline
const STATUS_TIMELINE_QUERY = `
  query PostStatusTimeline($postId: UUID!) {
    post(rowId: $postId) {
      rowId
      postStatusChanges(orderBy: CREATED_AT_ASC) {
        nodes {
          rowId
          createdAt
          toStatusTemplate {
            displayName
            color
          }
          changedBy {
            username
            avatarUrl
          }
        }
      }
    }
  }
`;

/** Query key for a post's status timeline, exported for consistent invalidation. */
export const statusTimelineQueryKey = (postId: string) =>
  ["PostStatusTimeline", postId] as const;

/** A post's status-change timeline, oldest first. */
export const statusTimelineOptions = (postId: string) =>
  queryOptions({
    queryKey: statusTimelineQueryKey(postId),
    queryFn: graphqlFetch<StatusTimelineData, { postId: string }>(
      STATUS_TIMELINE_QUERY,
      { postId },
    ),
    enabled: Boolean(postId),
    select: (data) => data.post?.postStatusChanges?.nodes ?? [],
  });

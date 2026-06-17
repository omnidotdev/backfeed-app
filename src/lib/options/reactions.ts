import { queryOptions } from "@tanstack/react-query";

import { graphqlFetch } from "@/lib/graphql/graphqlFetch";

/** A single emoji reaction on a post. */
export interface PostReaction {
  rowId: string;
  emoji: string;
  userId: string;
}

interface PostReactionsData {
  post: {
    rowId: string;
    reactions: { nodes: PostReaction[] };
  } | null;
}

// raw documents (no codegen needed); the API exposes auto-CRUD reaction fields
const POST_REACTIONS_QUERY = `
  query PostReactions($postId: UUID!) {
    post(rowId: $postId) {
      rowId
      reactions {
        nodes {
          rowId
          emoji
          userId
        }
      }
    }
  }
`;

const CREATE_REACTION_MUTATION = `
  mutation CreateReaction($input: CreateReactionInput!) {
    createReaction(input: $input) {
      reaction {
        rowId
        emoji
        userId
      }
    }
  }
`;

const DELETE_REACTION_MUTATION = `
  mutation DeleteReaction($rowId: UUID!) {
    deleteReaction(input: { rowId: $rowId }) {
      clientMutationId
    }
  }
`;

/** Query key root, exported so callers can invalidate consistently. */
export const postReactionsQueryKey = (postId: string) =>
  ["PostReactions", postId] as const;

/** Reactions on a specific post. */
export const postReactionsOptions = (postId: string) =>
  queryOptions({
    queryKey: postReactionsQueryKey(postId),
    queryFn: graphqlFetch<PostReactionsData, { postId: string }>(
      POST_REACTIONS_QUERY,
      { postId },
    ),
    enabled: Boolean(postId),
    select: (data) => data.post?.reactions?.nodes ?? [],
  });

/** Add an emoji reaction to a post as the given user. */
export const createReaction = (input: {
  postId: string;
  userId: string;
  emoji: string;
}) =>
  graphqlFetch<
    { createReaction: { reaction: PostReaction } },
    { input: { reaction: typeof input } }
  >(CREATE_REACTION_MUTATION, { input: { reaction: input } })();

/** Remove a reaction by its rowId. */
export const deleteReaction = (rowId: string) =>
  graphqlFetch<
    { deleteReaction: { clientMutationId: string | null } },
    { rowId: string }
  >(DELETE_REACTION_MUTATION, { rowId })();

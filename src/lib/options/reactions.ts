import { queryOptions } from "@tanstack/react-query";

import { graphqlFetch } from "@/lib/graphql/graphqlFetch";

/** A single emoji reaction on a post or comment. */
export interface Reaction {
  rowId: string;
  emoji: string;
  userId: string;
}

/** Target a reaction belongs to: exactly one of post or comment. */
export type ReactionTarget =
  | { postId: string; commentId?: undefined }
  | { commentId: string; postId?: undefined };

interface PostReactionsData {
  post: {
    rowId: string;
    reactions: { nodes: Reaction[] };
  } | null;
}

interface CommentReactionsData {
  comment: {
    rowId: string;
    reactions: { nodes: Reaction[] };
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

const COMMENT_REACTIONS_QUERY = `
  query CommentReactions($commentId: UUID!) {
    comment(rowId: $commentId) {
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

/** Query key for a target's reactions, exported for consistent invalidation. */
export const reactionsQueryKey = (target: ReactionTarget) =>
  target.commentId
    ? (["Reactions", "comment", target.commentId] as const)
    : (["Reactions", "post", target.postId] as const);

/** Reactions on a specific post or comment. */
export const reactionsOptions = (target: ReactionTarget) =>
  queryOptions({
    queryKey: reactionsQueryKey(target),
    queryFn: async (): Promise<Reaction[]> => {
      if (target.commentId) {
        const data = await graphqlFetch<
          CommentReactionsData,
          { commentId: string }
        >(COMMENT_REACTIONS_QUERY, { commentId: target.commentId })();

        return data.comment?.reactions?.nodes ?? [];
      }

      const data = await graphqlFetch<PostReactionsData, { postId: string }>(
        POST_REACTIONS_QUERY,
        { postId: target.postId! },
      )();

      return data.post?.reactions?.nodes ?? [];
    },
    enabled: Boolean(target.commentId ?? target.postId),
  });

/** Add an emoji reaction to a post or comment as the given user. */
export const createReaction = (
  input: ReactionTarget & { userId: string; emoji: string },
) =>
  graphqlFetch<
    { createReaction: { reaction: Reaction } },
    { input: { reaction: typeof input } }
  >(CREATE_REACTION_MUTATION, { input: { reaction: input } })();

/** Remove a reaction by its rowId. */
export const deleteReaction = (rowId: string) =>
  graphqlFetch<
    { deleteReaction: { clientMutationId: string | null } },
    { rowId: string }
  >(DELETE_REACTION_MUTATION, { rowId })();

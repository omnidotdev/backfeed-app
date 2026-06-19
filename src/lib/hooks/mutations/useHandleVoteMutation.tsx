import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  VoteType,
  useCreateVoteMutation,
  useDeleteVoteMutation,
  useUpdateVoteMutation,
} from "@/generated/graphql";
import { feedbackByIdOptions } from "@/lib/options/feedback";
import { projectMetricsOptions } from "@/lib/options/projects";

import type {
  InfiniteData,
  QueryKey,
  UseMutationOptions,
} from "@tanstack/react-query";
import type {
  FeedbackByIdQuery,
  Post,
  PostsQuery,
  Project,
  Vote,
} from "@/generated/graphql";

/** Query key prefixes for every cache that holds vote data for a post. */
const POSTS_KEY: QueryKey = ["Posts.infinite"];
const FEEDBACK_KEY: QueryKey = ["FeedbackById"];

interface Options {
  /** Feedback ID */
  feedbackId: Post["rowId"];
  /** Project ID */
  projectId: Project["rowId"];
  /** Current user's vote on this post (if any) */
  userVote: Partial<Vote> | null | undefined;
  /** The type of vote to cast */
  voteType: VoteType;
  /** Whether voting is being handled from the dynamic feedback route */
  isFeedbackRoute: boolean;
  /** Current user's rowId for vote ownership */
  userId?: string;
  /** Mutation options */
  mutationOptions?: UseMutationOptions;
}

/** Snapshots captured in onMutate so a failed vote can be rolled back. */
interface VoteRollbackContext {
  previousPosts: [QueryKey, InfiniteData<PostsQuery> | undefined][];
  previousFeedback: [QueryKey, FeedbackByIdQuery | undefined][];
}

/**
 * Handle voting on feedback.
 * - If user has no vote, creates a vote with the specified type
 * - If user has the same vote type, removes the vote (toggle off)
 * - If user has a different vote type, updates the vote
 *
 * The optimistic update targets every cached posts list and feedback detail by
 * key prefix, so the vote icons and count flip immediately on any view (project
 * board, roadmap, single feedback) regardless of its sort or search, then
 * reconcile with the server in onSettled. A failed vote rolls back in onError.
 */
const useHandleVoteMutation = ({
  feedbackId,
  projectId,
  userVote,
  voteType,
  isFeedbackRoute,
  userId,
  mutationOptions,
}: Options) => {
  const queryClient = useQueryClient();

  const { mutateAsync: createVote } = useCreateVoteMutation();
  const { mutateAsync: updateVote } = useUpdateVoteMutation();
  const { mutateAsync: deleteVote } = useDeleteVoteMutation();

  const isUpvote = voteType === VoteType.Up;
  const isDownvote = voteType === VoteType.Down;
  const hasVote = !!userVote;
  const hasSameVote = hasVote && userVote.voteType === voteType;
  const hasDifferentVote = hasVote && userVote.voteType !== voteType;

  return useMutation({
    mutationKey: ["handleVote", feedbackId, voteType],
    mutationFn: async () => {
      if (hasSameVote) {
        // toggle off - remove the vote
        await deleteVote({ rowId: userVote.rowId! });
      } else if (hasDifferentVote) {
        // change vote type
        await updateVote({
          rowId: userVote.rowId!,
          patch: { voteType },
        });
      } else {
        // create new vote
        await createVote({
          input: {
            vote: {
              postId: feedbackId,
              userId: userId!,
              voteType,
            },
          },
        });
      }
    },
    onMutate: async (): Promise<VoteRollbackContext> => {
      // stop in-flight refetches so they cannot clobber the optimistic write
      await Promise.all([
        queryClient.cancelQueries({ queryKey: POSTS_KEY }),
        queryClient.cancelQueries({ queryKey: FEEDBACK_KEY }),
      ]);

      // snapshot every affected list/detail query for rollback
      const previousPosts = queryClient.getQueriesData<
        InfiniteData<PostsQuery>
      >({ queryKey: POSTS_KEY });
      const previousFeedback = queryClient.getQueriesData<FeedbackByIdQuery>({
        queryKey: FEEDBACK_KEY,
      });

      const getOptimisticCounts = (
        currentUpvotes: number,
        currentDownvotes: number,
      ) => {
        let upvotes = currentUpvotes;
        let downvotes = currentDownvotes;

        if (hasSameVote) {
          // removing vote
          if (isUpvote) upvotes--;
          else downvotes--;
        } else if (hasDifferentVote) {
          // changing vote
          if (isUpvote) {
            upvotes++;
            downvotes--;
          } else {
            upvotes--;
            downvotes++;
          }
        } else {
          // adding vote
          if (isUpvote) upvotes++;
          else downvotes++;
        }

        return { upvotes, downvotes };
      };

      const getOptimisticUserVotes = () => {
        if (hasSameVote) {
          // removing vote - no user votes
          return {
            userUpvotes: { nodes: [] },
            userDownvotes: { nodes: [] },
          };
        }
        if (hasDifferentVote || !hasVote) {
          // adding or changing vote
          return {
            userUpvotes: {
              nodes: isUpvote ? [{ rowId: userVote?.rowId ?? "pending" }] : [],
            },
            userDownvotes: {
              nodes: isDownvote
                ? [{ rowId: userVote?.rowId ?? "pending" }]
                : [],
            },
          };
        }
        return {
          userUpvotes: { nodes: [] },
          userDownvotes: { nodes: [] },
        };
      };

      // update every cached feedback detail for this post
      queryClient.setQueriesData<FeedbackByIdQuery>(
        { queryKey: FEEDBACK_KEY },
        (old) => {
          if (!old?.post || old.post.rowId !== feedbackId) return old;

          const { upvotes, downvotes } = getOptimisticCounts(
            old.post.upvotes?.totalCount ?? 0,
            old.post.downvotes?.totalCount ?? 0,
          );

          return {
            ...old,
            post: {
              ...old.post,
              ...getOptimisticUserVotes(),
              upvotes: { ...old.post.upvotes, totalCount: upvotes },
              downvotes: { ...old.post.downvotes, totalCount: downvotes },
            },
          };
        },
      );

      // update this post in every cached feedback list (board, roadmap, etc.)
      queryClient.setQueriesData<InfiniteData<PostsQuery>>(
        { queryKey: POSTS_KEY },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              posts: {
                ...page.posts,
                nodes: page.posts?.nodes?.map((post) => {
                  if (post?.rowId !== feedbackId) return post;

                  const { upvotes, downvotes } = getOptimisticCounts(
                    post.upvotes.totalCount,
                    post.downvotes.totalCount,
                  );

                  return {
                    ...post,
                    ...getOptimisticUserVotes(),
                    upvotes: { ...post.upvotes, totalCount: upvotes },
                    downvotes: { ...post.downvotes, totalCount: downvotes },
                  };
                }),
              },
            })),
          } as InfiniteData<PostsQuery>;
        },
      );

      return { previousPosts, previousFeedback };
    },
    onError: (_error, _variables, context) => {
      // a failed vote should not stick; restore every snapshot we took
      const ctx = context as VoteRollbackContext | undefined;
      for (const [key, data] of ctx?.previousPosts ?? [])
        queryClient.setQueryData(key, data);
      for (const [key, data] of ctx?.previousFeedback ?? [])
        queryClient.setQueryData(key, data);
    },
    onSettled: async () => {
      if (isFeedbackRoute) {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: POSTS_KEY }),
          queryClient.invalidateQueries({
            queryKey: projectMetricsOptions({ projectId }).queryKey,
          }),
        ]);

        return queryClient.invalidateQueries({
          queryKey: feedbackByIdOptions({
            rowId: feedbackId,
            userId: userId,
          }).queryKey,
        });
      }

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: feedbackByIdOptions({
            rowId: feedbackId,
            userId: userId,
          }).queryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: projectMetricsOptions({ projectId }).queryKey,
        }),
      ]);

      return queryClient.invalidateQueries({ queryKey: POSTS_KEY });
    },
    ...mutationOptions,
  });
};

export default useHandleVoteMutation;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";

import {
  PostOrderBy,
  VoteType,
  useCreateVoteMutation,
  useDeleteVoteMutation,
  useUpdateVoteMutation,
} from "@/generated/graphql";
import {
  feedbackByIdOptions,
  infiniteFeedbackOptions,
} from "@/lib/options/feedback";
import { projectMetricsOptions } from "@/lib/options/projects";

import type { InfiniteData, UseMutationOptions } from "@tanstack/react-query";
import type {
  FeedbackByIdQuery,
  Post,
  PostsQuery,
  Project,
  Vote,
} from "@/generated/graphql";

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
  /** Mutation options */
  mutationOptions?: UseMutationOptions;
}

/**
 * Handle voting on feedback.
 * - If user has no vote, creates a vote with the specified type
 * - If user has the same vote type, removes the vote (toggle off)
 * - If user has a different vote type, updates the vote
 */
const useHandleVoteMutation = ({
  feedbackId,
  projectId,
  userVote,
  voteType,
  isFeedbackRoute,
  mutationOptions,
}: Options) => {
  const queryClient = useQueryClient();

  const { excludedStatuses, orderBy, search } = useSearch({ strict: false });

  const { session } = useRouteContext({ from: "/_auth" });

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
              userId: session?.user?.rowId!,
              voteType,
            },
          },
        });
      }
    },
    onMutate: async () => {
      const feedbackSnapshot = queryClient.getQueryData(
        feedbackByIdOptions({
          rowId: feedbackId,
          userId: session?.user?.rowId,
        }).queryKey,
      ) as FeedbackByIdQuery;

      const postsQueryKey = infiniteFeedbackOptions({
        projectId,
        excludedStatuses,
        orderBy: orderBy
          ? [orderBy as PostOrderBy, PostOrderBy.CreatedAtDesc]
          : undefined,
        search,
        userId: session?.user?.rowId,
      }).queryKey;

      const postsSnapshot = queryClient.getQueryData(
        postsQueryKey,
      ) as InfiniteData<PostsQuery>;

      // calculate optimistic updates
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
        } else if (hasDifferentVote || !hasVote) {
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

      if (feedbackSnapshot) {
        const { upvotes, downvotes } = getOptimisticCounts(
          feedbackSnapshot?.post?.upvotes?.totalCount ?? 0,
          feedbackSnapshot?.post?.downvotes?.totalCount ?? 0,
        );

        queryClient.setQueryData(
          feedbackByIdOptions({
            rowId: feedbackId,
            userId: session?.user?.rowId,
          }).queryKey,
          {
            post: {
              ...feedbackSnapshot?.post!,
              ...getOptimisticUserVotes(),
              upvotes: {
                ...feedbackSnapshot?.post?.upvotes,
                totalCount: upvotes,
              },
              downvotes: {
                ...feedbackSnapshot?.post?.downvotes,
                totalCount: downvotes,
              },
            },
          },
        );
      }

      if (postsSnapshot) {
        queryClient.setQueryData(postsQueryKey, {
          ...postsSnapshot,
          // @ts-expect-error TODO: properly type
          pages: postsSnapshot.pages.map((page) => ({
            ...page,
            posts: {
              ...page.posts,
              nodes: page.posts?.nodes?.map((post) => {
                if (post?.rowId === feedbackId) {
                  const { upvotes, downvotes } = getOptimisticCounts(
                    post.upvotes.totalCount,
                    post.downvotes.totalCount,
                  );

                  return {
                    ...post,
                    ...getOptimisticUserVotes(),
                    upvotes: { totalCount: upvotes },
                    downvotes: { totalCount: downvotes },
                  };
                }

                return post;
              }),
            },
          })),
        });
      }
    },
    onSettled: async () => {
      if (isFeedbackRoute) {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["Posts.infinite"] }),
          queryClient.invalidateQueries({
            queryKey: projectMetricsOptions({ projectId }).queryKey,
          }),
        ]);

        return queryClient.invalidateQueries({
          queryKey: feedbackByIdOptions({
            rowId: feedbackId,
            userId: session?.user?.rowId,
          }).queryKey,
        });
      }

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: feedbackByIdOptions({
            rowId: feedbackId,
            userId: session?.user?.rowId,
          }).queryKey,
        }),
        queryClient.invalidateQueries({
          queryKey: projectMetricsOptions({ projectId }).queryKey,
        }),
      ]);

      return queryClient.invalidateQueries({ queryKey: ["Posts.infinite"] });
    },
    ...mutationOptions,
  });
};

export default useHandleVoteMutation;

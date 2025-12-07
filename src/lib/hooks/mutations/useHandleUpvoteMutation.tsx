import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";

import {
  PostOrderBy,
  useCreateUpvoteMutation,
  useDeleteDownvoteMutation,
  useDeleteUpvoteMutation,
} from "@/generated/graphql";
import {
  feedbackByIdOptions,
  infiniteFeedbackOptions,
} from "@/lib/options/feedback";
import { projectMetricsOptions } from "@/lib/options/projects";

import type { InfiniteData, UseMutationOptions } from "@tanstack/react-query";
import type {
  Downvote,
  FeedbackByIdQuery,
  Post,
  PostsQuery,
  Project,
  Upvote,
} from "@/generated/graphql";

interface Options {
  /** Feedback ID */
  feedbackId: Post["rowId"];
  /** project ID */
  projectId: Project["rowId"];
  /** Upvote object. Used to determine if the user has already upvoted */
  upvote: Partial<Upvote> | null | undefined;
  /** Downvote object. Used to determine if the user has already downvoted */
  downvote: Partial<Downvote> | null | undefined;
  /** Whether voting is being handled from the dynamic feedback route. */
  isFeedbackRoute: boolean;
  /** mutation options */
  mutationOptions?: UseMutationOptions;
}

/**
 * Handle upvoting on feedback.
 */
const useHandleUpvoteMutation = ({
  feedbackId,
  projectId,
  upvote,
  downvote,
  isFeedbackRoute,
  mutationOptions,
}: Options) => {
  const queryClient = useQueryClient();

  const { excludedStatuses, orderBy, search } = useSearch({ strict: false });

  const { session } = useRouteContext({ from: "/_auth" });

  const { mutateAsync: createUpvote } = useCreateUpvoteMutation();
  const { mutateAsync: deleteUpvote } = useDeleteUpvoteMutation();
  const { mutateAsync: deleteDownvote } = useDeleteDownvoteMutation();

  return useMutation({
    mutationKey: ["handleUpvote", feedbackId],
    mutationFn: async () => {
      if (downvote) {
        await deleteDownvote({
          rowId: downvote.rowId!,
        });
      }

      if (upvote) {
        await deleteUpvote({
          rowId: upvote.rowId!,
        });
      } else {
        await createUpvote({
          input: {
            upvote: {
              postId: feedbackId,
              userId: session?.user?.rowId!,
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

      if (feedbackSnapshot) {
        queryClient.setQueryData(
          feedbackByIdOptions({
            rowId: feedbackId,
            userId: session?.user?.rowId,
          }).queryKey,
          {
            post: {
              ...feedbackSnapshot?.post!,
              userUpvotes: {
                nodes: upvote ? [] : [{ rowId: "pending" }],
              },
              userDownvotes: {
                nodes: upvote
                  ? feedbackSnapshot?.post?.userDownvotes?.nodes!
                  : [],
              },
              upvotes: {
                ...feedbackSnapshot?.post?.upvotes,
                totalCount:
                  (feedbackSnapshot?.post?.upvotes?.totalCount ?? 0) +
                  (upvote ? -1 : 1),
              },
              downvotes: {
                ...feedbackSnapshot?.post?.downvotes,
                totalCount:
                  (feedbackSnapshot?.post?.downvotes?.totalCount ?? 0) +
                  (downvote ? -1 : 0),
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
                  return {
                    ...post,
                    userUpvotes: {
                      nodes: upvote ? [] : [{ rowId: "pending" }],
                    },
                    userDownvotes: {
                      nodes: upvote ? post.userDownvotes : [],
                    },
                    upvotes: {
                      totalCount: post.upvotes.totalCount + (upvote ? -1 : 1),
                    },
                    downvotes: {
                      totalCount:
                        post.downvotes.totalCount + (downvote ? -1 : 0),
                    },
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

export default useHandleUpvoteMutation;

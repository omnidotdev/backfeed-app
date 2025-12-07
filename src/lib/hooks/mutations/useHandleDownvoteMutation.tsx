import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouteContext, useSearch } from "@tanstack/react-router";

import {
  PostOrderBy,
  useCreateDownvoteMutation,
  useDeleteDownvoteMutation,
  useDeleteUpvoteMutation,
  useFeedbackByIdQuery,
  useInfinitePostsQuery,
  useProjectMetricsQuery,
} from "@/generated/graphql";

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
 * Handle downvoting on feedback.
 */
const useHandleDownvoteMutation = ({
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

  const { mutateAsync: createDownvote } = useCreateDownvoteMutation();
  const { mutateAsync: deleteUpvote } = useDeleteUpvoteMutation();
  const { mutateAsync: deleteDownvote } = useDeleteDownvoteMutation();

  return useMutation({
    mutationKey: ["handleDownvote", feedbackId],
    mutationFn: async () => {
      if (upvote) {
        await deleteUpvote({
          rowId: upvote.rowId!,
        });
      }

      if (downvote) {
        await deleteDownvote({
          rowId: downvote.rowId!,
        });
      } else {
        await createDownvote({
          input: {
            downvote: {
              postId: feedbackId,
              userId: session?.user?.rowId!,
            },
          },
        });
      }
    },
    onMutate: async () => {
      const feedbackSnapshot = queryClient.getQueryData(
        useFeedbackByIdQuery.getKey({
          rowId: feedbackId,
          userId: session?.user?.rowId,
        }),
      ) as FeedbackByIdQuery;

      const postsQueryKey = useInfinitePostsQuery.getKey({
        projectId,
        excludedStatuses,
        orderBy: orderBy
          ? [orderBy as PostOrderBy, PostOrderBy.CreatedAtDesc]
          : undefined,
        search,
        userId: session?.user?.rowId,
      });

      const postsSnapshot = queryClient.getQueryData(
        postsQueryKey,
      ) as InfiniteData<PostsQuery>;

      if (feedbackSnapshot) {
        queryClient.setQueryData(
          useFeedbackByIdQuery.getKey({
            rowId: feedbackId,
            userId: session?.user?.rowId,
          }),
          {
            post: {
              ...feedbackSnapshot?.post,
              userDownvotes: {
                nodes: downvote ? [] : [{ rowId: "pending" }],
              },
              userUpvotes: {
                nodes: downvote ? feedbackSnapshot?.post?.userUpvotes : [],
              },
              downvotes: {
                ...feedbackSnapshot?.post?.downvotes,
                totalCount:
                  (feedbackSnapshot?.post?.downvotes?.totalCount ?? 0) +
                  (downvote ? -1 : 1),
              },
              upvotes: {
                ...feedbackSnapshot?.post?.upvotes,
                totalCount:
                  (feedbackSnapshot?.post?.upvotes?.totalCount ?? 0) +
                  (upvote ? -1 : 0),
              },
            },
          },
        );
      }

      if (postsSnapshot) {
        queryClient.setQueryData(postsQueryKey, {
          ...postsSnapshot,
          pages: postsSnapshot.pages.map((page) => ({
            ...page,
            posts: {
              ...page.posts,
              nodes: page.posts?.nodes?.map((post) => {
                if (post?.rowId === feedbackId) {
                  return {
                    ...post,
                    userDownvotes: {
                      nodes: downvote ? [] : [{ rowId: "pending" }],
                    },
                    userUpvotes: {
                      nodes: downvote ? post.userUpvotes : [],
                    },
                    upvotes: {
                      totalCount: post.upvotes.totalCount + (upvote ? -1 : 0),
                    },
                    downvotes: {
                      totalCount:
                        post.downvotes.totalCount + (downvote ? -1 : 1),
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
            queryKey: useProjectMetricsQuery.getKey({ projectId }),
          }),
        ]);

        return queryClient.invalidateQueries({
          queryKey: useFeedbackByIdQuery.getKey({
            rowId: feedbackId,
            userId: session?.user?.rowId,
          }),
        });
      }

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: useFeedbackByIdQuery.getKey({
            rowId: feedbackId,
            userId: session?.user?.rowId,
          }),
        }),
        queryClient.invalidateQueries({
          queryKey: useProjectMetricsQuery.getKey({ projectId }),
        }),
      ]);

      return queryClient.invalidateQueries({ queryKey: ["Posts.infinite"] });
    },
    ...mutationOptions,
  });
};

export default useHandleDownvoteMutation;

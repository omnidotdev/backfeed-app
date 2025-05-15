import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  useCreateDownvoteMutation,
  useDeleteDownvoteMutation,
  useDeleteUpvoteMutation,
  useProjectMetricsQuery,
} from "generated/graphql";
import { useAuth, useSearchParams } from "lib/hooks";
import { feedbackByIdOptions, infinitePostsOptions } from "lib/options";

import type { InfiniteData, UseMutationOptions } from "@tanstack/react-query";
import type {
  Downvote,
  FeedbackByIdQuery,
  Post,
  PostsQuery,
  Project,
  Upvote,
} from "generated/graphql";

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

  const [{ excludedStatuses, orderBy, search }] = useSearchParams();

  const { user } = useAuth();

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
              userId: user?.rowId!,
            },
          },
        });
      }
    },
    onMutate: async () => {
      const feedbackQueryKey = feedbackByIdOptions({
        rowId: feedbackId,
        userId: user?.rowId,
      }).queryKey;

      const feedbackSnapshot = queryClient.getQueryData(
        feedbackQueryKey,
      ) as FeedbackByIdQuery;

      const postsQueryKey = infinitePostsOptions({
        projectId,
        userId: user?.rowId,
        excludedStatuses,
        orderBy,
        search,
      }).queryKey;

      const postsSnapshot =
        queryClient.getQueryData<InfiniteData<PostsQuery>>(postsQueryKey);

      if (feedbackSnapshot) {
        queryClient.setQueryData(feedbackQueryKey, {
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
        } as FeedbackByIdQuery);
      }

      if (postsSnapshot) {
        queryClient.setQueryData<InfiniteData<PostsQuery>>(
          postsQueryKey,
          (snapshot) => {
            const updatedPosts = snapshot!.pages.map((page) => ({
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
            }));

            return {
              ...snapshot,
              pages: updatedPosts,
            } as InfiniteData<PostsQuery>;
          },
        );
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

        return queryClient.invalidateQueries(
          feedbackByIdOptions({ rowId: feedbackId, userId: user?.rowId }),
        );
      }

      await Promise.all([
        queryClient.invalidateQueries(
          feedbackByIdOptions({ rowId: feedbackId, userId: user?.rowId }),
        ),
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

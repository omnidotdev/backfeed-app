import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  useCreateDownvoteMutation,
  useDeleteDownvoteMutation,
  useDeleteUpvoteMutation,
  useDownvoteQuery,
  useFeedbackByIdQuery,
  useUpvoteQuery,
} from "generated/graphql";
import { useAuth } from "lib/hooks";

import type { UseMutationOptions } from "@tanstack/react-query";
import type { Downvote, FeedbackByIdQuery, Upvote } from "generated/graphql";

interface Options {
  /** Feedback ID */
  feedbackId: string;
  /** Upvote object. Used to determine if the user has already upvoted */
  upvote: Partial<Upvote> | null | undefined;
  /** Downvote object. Used to determine if the user has already downvoted */
  downvote: Partial<Downvote> | null | undefined;
  /** mutation options */
  mutationOptions?: UseMutationOptions;
}

/**
 * Handle downvoting a feedback item.
 */
const useHandleDownvoteMutation = ({
  feedbackId,
  upvote,
  downvote,
  mutationOptions,
}: Options) => {
  const queryClient = useQueryClient();

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
      const snapshot = queryClient.getQueryData(
        useFeedbackByIdQuery.getKey({ rowId: feedbackId })
      ) as FeedbackByIdQuery;

      queryClient.setQueryData(
        useFeedbackByIdQuery.getKey({ rowId: feedbackId }),
        {
          post: {
            ...snapshot?.post,
            downvotes: {
              ...snapshot?.post?.downvotes,
              totalCount:
                (snapshot?.post?.downvotes?.totalCount ?? 0) +
                (downvote ? -1 : 1),
            },
            upvotes: {
              ...snapshot?.post?.upvotes,
              totalCount:
                (snapshot?.post?.upvotes?.totalCount ?? 0) + (upvote ? -1 : 0),
            },
          },
        }
      );

      queryClient.setQueryData(
        useDownvoteQuery.getKey({ feedbackId, userId: user?.rowId! }),
        downvote
          ? null
          : {
              downvoteByPostIdAndUserId: {
                rowId: "pending",
              },
            }
      );

      if (upvote) {
        queryClient.setQueryData(
          useUpvoteQuery.getKey({ feedbackId, userId: user?.rowId! }),
          null
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: useFeedbackByIdQuery.getKey({ rowId: feedbackId }),
      });
      queryClient.invalidateQueries({
        queryKey: useUpvoteQuery.getKey({
          feedbackId: feedbackId,
          userId: user?.rowId!,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: useDownvoteQuery.getKey({
          feedbackId: feedbackId,
          userId: user?.rowId!,
        }),
      });
    },
    ...mutationOptions,
  });
};

export default useHandleDownvoteMutation;

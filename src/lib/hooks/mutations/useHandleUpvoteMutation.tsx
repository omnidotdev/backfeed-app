import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  useCreateUpvoteMutation,
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
 * Handle upvoting on feedback.
 */
const useHandleUpvoteMutation = ({
  feedbackId,
  upvote,
  downvote,
  mutationOptions,
}: Options) => {
  const queryClient = useQueryClient();

  const { user } = useAuth();

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
            upvotes: {
              ...snapshot?.post?.upvotes,
              totalCount:
                (snapshot?.post?.upvotes?.totalCount ?? 0) + (upvote ? -1 : 1),
            },
            downvotes: {
              ...snapshot?.post?.downvotes,
              totalCount:
                (snapshot?.post?.downvotes?.totalCount ?? 0) +
                (downvote ? -1 : 0),
            },
          },
        }
      );

      queryClient.setQueryData(
        useUpvoteQuery.getKey({ feedbackId, userId: user?.rowId! }),
        upvote
          ? null
          : {
              upvoteByPostIdAndUserId: {
                rowId: "pending",
              },
            }
      );

      if (downvote) {
        queryClient.setQueryData(
          useDownvoteQuery.getKey({ feedbackId, userId: user?.rowId! }),
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

export default useHandleUpvoteMutation;

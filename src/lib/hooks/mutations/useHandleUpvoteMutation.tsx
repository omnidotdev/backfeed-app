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
import type {
  Downvote,
  DownvoteQuery,
  FeedbackByIdQuery,
  Upvote,
  UpvoteQuery,
} from "generated/graphql";

interface Options {
  /** Feedback ID */
  feedbackId: string;
  /** Upvote object. Used to determine if the user has already upvoted */
  upvote: Partial<Upvote> | null | undefined;
  /** Downvote object. Used to determine if the user has already downvoted */
  downvote: Partial<Downvote> | null | undefined;
  /** mutation options */
  mutationOptions?: UseMutationOptions<
    unknown,
    Error,
    void,
    {
      feedbackSnapshot: FeedbackByIdQuery;
      upvoteSnapshot: UpvoteQuery;
      downvoteSnapshot: DownvoteQuery;
    }
  >;
}

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

  return useMutation<
    unknown,
    Error,
    void,
    {
      feedbackSnapshot: FeedbackByIdQuery;
      upvoteSnapshot: UpvoteQuery;
      downvoteSnapshot: DownvoteQuery;
    }
  >({
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
      await queryClient.cancelQueries({
        queryKey: useFeedbackByIdQuery.getKey({ rowId: feedbackId }),
      });

      const feedbackSnapshot = queryClient.getQueryData(
        useFeedbackByIdQuery.getKey({ rowId: feedbackId })
      ) as FeedbackByIdQuery;

      const upvoteSnapshot = queryClient.getQueryData(
        useUpvoteQuery.getKey({ feedbackId, userId: user?.rowId! })
      ) as UpvoteQuery;

      const downvoteSnapshot = queryClient.getQueryData(
        useDownvoteQuery.getKey({ feedbackId, userId: user?.rowId! })
      ) as DownvoteQuery;

      queryClient.setQueryData(
        useFeedbackByIdQuery.getKey({ rowId: feedbackId }),
        {
          post: {
            ...feedbackSnapshot?.post,
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

      return { feedbackSnapshot, upvoteSnapshot, downvoteSnapshot };
    },
    onError: (_error, _update, context) => {
      queryClient.setQueryData(
        useFeedbackByIdQuery.getKey({ rowId: feedbackId }),
        context?.feedbackSnapshot
      );

      queryClient.setQueryData(
        useUpvoteQuery.getKey({ feedbackId, userId: user?.rowId! }),
        context?.upvoteSnapshot
      );

      queryClient.setQueryData(
        useDownvoteQuery.getKey({ feedbackId, userId: user?.rowId! }),
        context?.downvoteSnapshot
      );
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

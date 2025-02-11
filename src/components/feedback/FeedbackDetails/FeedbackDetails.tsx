"use client";

import { HStack, Icon, Tooltip } from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import {
  PiArrowFatLineDown,
  PiArrowFatLineDownFill,
  PiArrowFatLineUp,
  PiArrowFatLineUpFill,
} from "react-icons/pi";

import { FeedbackCard } from "components/feedback";
import {
  useCreateDownvoteMutation,
  useCreateUpvoteMutation,
  useDeleteDownvoteMutation,
  useDeleteUpvoteMutation,
  useDownvoteQuery,
  useFeedbackByIdQuery,
  useUpvoteQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

import type {
  HstackProps,
  TooltipTriggerProps,
  VstackProps,
} from "@omnidev/sigil";
import type { InvalidateOptions } from "@tanstack/react-query";
import type { Post } from "generated/graphql";
import type { IconType } from "react-icons";

interface VoteButtonProps extends TooltipTriggerProps {
  /** Number of votes (upvotes or downvotes). */
  votes: number | undefined;
  /** Tooltip text. */
  tooltip: string;
  /** Visual icon. */
  icon: IconType;
  /** Props to pass to the main content container. */
  contentProps?: VstackProps;
}

interface Props extends HstackProps {
  /** Feedback ID. Used to fetch feedback details. */
  feedbackId: Post["rowId"];
}

/**
 * Feedback details section.
 */
const FeedbackDetails = ({ feedbackId, ...rest }: Props) => {
  const { data: feedback } = useFeedbackByIdQuery(
    {
      rowId: feedbackId,
    },
    {
      select: (data) => data?.post,
    }
  );

  const queryClient = useQueryClient();

  const { user } = useAuth();

  const { data: hasUpvoted } = useUpvoteQuery(
    {
      userId: user?.rowId!,
      feedbackId: feedback?.rowId!,
    },
    {
      enabled: !!user?.rowId,
      select: (data) => data?.upvoteByPostIdAndUserId,
    }
  );

  const { data: hasDownvoted } = useDownvoteQuery(
    {
      userId: user?.rowId!,
      feedbackId: feedback?.rowId!,
    },
    {
      enabled: !!user?.rowId,
      select: (data) => data?.downvoteByPostIdAndUserId,
    }
  );

  const onSuccess = () => {
    // NB: Since our global callback has already invalidated everything, we just use `invalidateQueries` to "pick up" the already in flight Promises and return them. See: https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations#to-await-or-not-to-await
    const invalidationOptions: InvalidateOptions = {
      cancelRefetch: false,
    };

    return Promise.all([
      queryClient.invalidateQueries(
        {
          queryKey: useUpvoteQuery.getKey({
            feedbackId: feedback?.rowId!,
            userId: user?.rowId!,
          }),
        },
        invalidationOptions
      ),
      queryClient.invalidateQueries(
        {
          queryKey: useDownvoteQuery.getKey({
            feedbackId: feedback?.rowId!,
            userId: user?.rowId!,
          }),
        },
        invalidationOptions
      ),
      queryClient.invalidateQueries(
        {
          queryKey: useFeedbackByIdQuery.getKey({ rowId: feedback?.rowId! }),
        },
        invalidationOptions
      ),
    ]);
  };

  const { mutate: upvote, isPending: isUpvotePending } =
    useCreateUpvoteMutation({
      onSuccess,
    });
  const { mutate: downvote, isPending: isDownvotePending } =
    useCreateDownvoteMutation({
      onSuccess,
    });
  const { mutate: deleteUpvote, isPending: isDeleteUpvotePending } =
    useDeleteUpvoteMutation({
      onSuccess,
    });
  const { mutate: deleteDownvote, isPending: isDeleteDownvotePending } =
    useDeleteDownvoteMutation({
      onSuccess,
    });

  const totalUpvotes =
    (feedback?.upvotes?.totalCount ?? 0) +
    (isUpvotePending ? 1 : isDeleteUpvotePending ? -1 : 0);

  const totalDownvotes =
    (feedback?.downvotes?.totalCount ?? 0) +
    (isDownvotePending ? 1 : isDeleteDownvotePending ? -1 : 0);

  const VOTE_BUTTONS: VoteButtonProps[] = [
    {
      id: "upvote",
      votes: totalUpvotes,
      tooltip: app.feedbackPage.details.upvote,
      icon:
        !isDownvotePending && (hasUpvoted || isUpvotePending)
          ? PiArrowFatLineUpFill
          : PiArrowFatLineUp,
      color: "brand.tertiary",
      onClick: () => {
        if (hasDownvoted) {
          deleteDownvote({
            rowId: hasDownvoted.rowId,
          });
        }

        if (hasUpvoted) {
          deleteUpvote({
            rowId: hasUpvoted.rowId,
          });
        } else {
          upvote({
            input: {
              upvote: {
                postId: feedback?.rowId!,
                userId: user?.rowId!,
              },
            },
          });
        }
      },
    },
    {
      id: "downvote",
      votes: totalDownvotes,
      tooltip: app.feedbackPage.details.downvote,
      icon:
        !isUpvotePending && (hasDownvoted || isDownvotePending)
          ? PiArrowFatLineDownFill
          : PiArrowFatLineDown,
      color: "brand.quinary",
      onClick: () => {
        if (hasUpvoted) {
          deleteUpvote({
            rowId: hasUpvoted.rowId,
          });
        }

        if (hasDownvoted) {
          deleteDownvote({
            rowId: hasDownvoted.rowId,
          });
        } else {
          downvote({
            input: {
              downvote: {
                postId: feedback?.rowId!,
                userId: user?.rowId!,
              },
            },
          });
        }
      },
    },
  ];

  return (
    <FeedbackCard
      title={feedback?.title!}
      description={feedback?.description!}
      username={feedback?.user?.username!}
      createdAt={feedback?.createdAt}
      status="Planned"
      // TODO: implement when status logic is handled in db
      statusUpdatedAt={feedback?.updatedAt}
      totalUpvotes={totalUpvotes}
      totalDownvotes={totalDownvotes}
      {...rest}
    >
      {VOTE_BUTTONS.map(({ id, votes, tooltip, icon, ...rest }) => (
        <Tooltip
          key={id}
          positioning={{ placement: "top" }}
          trigger={
            <HStack gap={2} py={1} fontVariant="tabular-nums">
              <Icon src={icon} w={5} h={5} />
              {votes}
            </HStack>
          }
          triggerProps={{
            variant: "ghost",
            w: "full",
            bgColor: "transparent",
            opacity: {
              base: 1,
              _disabled: 0.3,
              _hover: { base: 0.8, _disabled: 0.3 },
            },
            ...rest,
          }}
        >
          {tooltip}
        </Tooltip>
      ))}
    </FeedbackCard>
  );
};
export default FeedbackDetails;

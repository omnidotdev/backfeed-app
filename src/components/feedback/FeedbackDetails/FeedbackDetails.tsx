"use client";

import { createListCollection } from "@ark-ui/react";
import { HStack, Icon, Select, Tooltip } from "@omnidev/sigil";
import { keepPreviousData, useQueryClient } from "@tanstack/react-query";
import {
  PiArrowFatLineDown,
  PiArrowFatLineDownFill,
  PiArrowFatLineUp,
  PiArrowFatLineUpFill,
} from "react-icons/pi";

import { FeedbackCard } from "components/feedback";
import {
  Status,
  useDownvoteQuery,
  useFeedbackByIdQuery,
  useUpdatePostMutation,
  useUpvoteQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { useAuth, useOrganizationMembership } from "lib/hooks";
import {
  useHandleDownvoteMutation,
  useHandleUpvoteMutation,
} from "lib/hooks/mutations";
import { convertFromSnakeCase } from "lib/util";

import type {
  HstackProps,
  TooltipTriggerProps,
  VstackProps,
} from "@omnidev/sigil";
import type { FeedbackByIdQuery, Post } from "generated/graphql";
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
  const queryClient = useQueryClient();

  const { user } = useAuth();

  const { data: feedback } = useFeedbackByIdQuery(
    {
      rowId: feedbackId,
    },
    {
      placeholderData: keepPreviousData,
      select: (data) => data?.post,
    }
  );

  const { isAdmin } = useOrganizationMembership({
    userId: user?.rowId,
    organizationId: feedback?.project?.organization?.rowId,
  });

  const { data: hasUpvoted } = useUpvoteQuery(
    {
      userId: user?.rowId!,
      feedbackId,
    },
    {
      enabled: !!user?.rowId,
      select: (data) => data?.upvoteByPostIdAndUserId,
    }
  );

  const { data: hasDownvoted } = useDownvoteQuery(
    {
      userId: user?.rowId!,
      feedbackId,
    },
    {
      enabled: !!user?.rowId,
      select: (data) => data?.downvoteByPostIdAndUserId,
    }
  );

  const { mutate: handleStatusChange } = useUpdatePostMutation({
    onMutate: (variables) => {
      const snapshot = queryClient.getQueryData(
        useFeedbackByIdQuery.getKey({ rowId: feedbackId })
      ) as FeedbackByIdQuery;

      queryClient.setQueryData(
        useFeedbackByIdQuery.getKey({ rowId: feedbackId }),
        {
          post: {
            ...snapshot?.post,
            status: variables.patch.status,
            statusUpdatedAt: variables.patch.statusUpdatedAt,
          },
        }
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: useFeedbackByIdQuery.getKey({ rowId: feedbackId }),
      });
    },
  });

  const { mutate: handleUpvote } = useHandleUpvoteMutation({
    feedbackId,
    upvote: hasUpvoted,
    downvote: hasDownvoted,
  });

  const { mutate: handleDownvote } = useHandleDownvoteMutation({
    feedbackId,
    upvote: hasUpvoted,
    downvote: hasDownvoted,
  });

  const totalUpvotes = feedback?.upvotes?.totalCount ?? 0;

  const totalDownvotes = feedback?.downvotes?.totalCount ?? 0;

  const VOTE_BUTTONS: VoteButtonProps[] = [
    {
      id: "upvote",
      votes: totalUpvotes,
      tooltip: app.feedbackPage.details.upvote,
      icon: hasUpvoted ? PiArrowFatLineUpFill : PiArrowFatLineUp,
      color: "brand.tertiary",
      onClick: () => handleUpvote(),
    },
    {
      id: "downvote",
      votes: totalDownvotes,
      tooltip: app.feedbackPage.details.downvote,
      icon: hasDownvoted ? PiArrowFatLineDownFill : PiArrowFatLineDown,
      color: "brand.quinary",
      onClick: () => handleDownvote(),
    },
  ];

  return (
    <FeedbackCard
      feedback={feedback!}
      totalUpvotes={totalUpvotes}
      totalDownvotes={totalDownvotes}
      {...rest}
    >
      <HStack justify="flex-end">
        {isAdmin && (
          <Select
            label={{ id: "status", singular: "Status", plural: "Statuses" }}
            collection={createListCollection({
              items: Object.values(Status).map((status) => ({
                label: convertFromSnakeCase(status),
                value: status,
              })),
            })}
            w={40}
            clearTriggerProps={{ display: "none" }}
            size="sm"
            displayFieldLabel={false}
            defaultValue={[feedback?.status!]}
            onValueChange={({ value }) =>
              value.length
                ? handleStatusChange({
                    rowId: feedbackId,
                    patch: {
                      status: value[0] as Status,
                      statusUpdatedAt: new Date(),
                    },
                  })
                : undefined
            }
          />
        )}

        <HStack>
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
        </HStack>
      </HStack>
    </FeedbackCard>
  );
};
export default FeedbackDetails;

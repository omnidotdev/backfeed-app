"use client";

import { HStack, Icon, Tooltip } from "@omnidev/sigil";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  PiArrowFatLineDown,
  PiArrowFatLineDownFill,
  PiArrowFatLineUp,
  PiArrowFatLineUpFill,
} from "react-icons/pi";

import { FeedbackCard } from "components/feedback";
import { app } from "lib/config";
import { useAuth, useOrganizationMembership } from "lib/hooks";

import type {
  HstackProps,
  TooltipTriggerProps,
  VstackProps,
} from "@omnidev/sigil";
import type { Post } from "generated/graphql";
import {
  useHandleDownvoteMutation,
  useHandleUpvoteMutation,
} from "lib/hooks/mutations";
import {
  downvoteQueryOptions,
  feedbackByIdQueryOptions,
  projectStatusesQueryOptions,
  upvoteQueryOptions,
} from "lib/react-query/options";

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
  const { user } = useAuth();

  const { data: feedback } = useSuspenseQuery(
    feedbackByIdQueryOptions({
      rowId: feedbackId,
    })
  );

  const { isAdmin } = useOrganizationMembership({
    userId: user?.rowId,
    organizationId: feedback?.project?.organization?.rowId,
  });

  // TODO: determine if needs suspense
  const { data: projectStatuses } = useQuery({
    ...projectStatusesQueryOptions({
      projectId: feedback?.project?.rowId!,
    }),
    enabled: isAdmin,
  });

  // TODO: for the most part works fine, but figure out why optimistic updates are a bit off for these (maybe userId??)
  const { data: hasUpvoted } = useSuspenseQuery(
    upvoteQueryOptions({
      userId: user?.rowId!,
      feedbackId,
    })
  );

  const { data: hasDownvoted } = useSuspenseQuery(
    downvoteQueryOptions({
      userId: user?.rowId!,
      feedbackId,
    })
  );

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
      onMouseDown: () => handleUpvote(),
    },
    {
      id: "downvote",
      votes: totalDownvotes,
      tooltip: app.feedbackPage.details.downvote,
      icon: hasDownvoted ? PiArrowFatLineDownFill : PiArrowFatLineDown,
      color: "brand.quinary",
      onMouseDown: () => handleDownvote(),
    },
  ];

  return (
    <FeedbackCard
      feedback={feedback!}
      totalUpvotes={totalUpvotes}
      totalDownvotes={totalDownvotes}
      projectStatuses={isAdmin ? projectStatuses : undefined}
      boxShadow="card"
      {...rest}
    >
      <HStack
        position="absolute"
        top={{ base: 1.5, sm: 3.5 }}
        right={{ base: 4, sm: 6 }}
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
              variant: "icon",
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
    </FeedbackCard>
  );
};
export default FeedbackDetails;

import { HStack, Icon, Tooltip } from "@omnidev/sigil";
import {
  PiArrowFatLineDown,
  PiArrowFatLineDownFill,
  PiArrowFatLineUp,
  PiArrowFatLineUpFill,
} from "react-icons/pi";

import { app } from "lib/config";
import {
  useHandleDownvoteMutation,
  useHandleUpvoteMutation,
} from "lib/hooks/mutations";

import type { TooltipTriggerProps, VstackProps } from "@omnidev/sigil";
import type { Downvote, Post, Project, Upvote } from "generated/graphql";
import type { Session } from "next-auth";
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

interface Props {
  /** Authenticated user. */
  user: Session["user"] | undefined;
  /** Feedback ID. */
  feedbackId: Post["rowId"];
  /** Project ID. */
  projectId: Project["rowId"];
  /** Upvote object. Used to determine if the user has already upvoted */
  upvote: Partial<Upvote> | null | undefined;
  /** Downvote object. Used to determine if the user has already downvoted */
  downvote: Partial<Downvote> | null | undefined;
  /** Total number of upvotes. */
  totalUpvotes: number;
  /** Total number of downvotes. */
  totalDownvotes: number;
}

const VotingButtons = ({
  user,
  feedbackId,
  projectId,
  upvote,
  downvote,
  totalUpvotes,
  totalDownvotes,
}: Props) => {
  const { mutate: handleUpvote, isPending: isUpvotePending } =
    useHandleUpvoteMutation({
      feedbackId,
      projectId,
      upvote,
      downvote,
    });

  const { mutate: handleDownvote, isPending: isDownvotePending } =
    useHandleDownvoteMutation({
      feedbackId,
      projectId,
      upvote,
      downvote,
    });

  // NB: we set `rowId` to `pending` optimistically for these values on occasion. If an attempt at triggering a mutation happens while they are still in this state, the mutation will fail
  const isOptimistic = [feedbackId, upvote?.rowId, downvote?.rowId].some(
    (state) => state === "pending",
  );

  const isVotePending = isUpvotePending || isDownvotePending;

  const VOTE_BUTTONS: VoteButtonProps[] = [
    {
      id: "upvote",
      votes: totalUpvotes,
      tooltip: app.feedbackPage.details.upvote,
      icon: upvote ? PiArrowFatLineUpFill : PiArrowFatLineUp,
      color: "brand.tertiary",
      onClick: (e) => {
        e.stopPropagation();
        handleUpvote();
      },
      disabled: !user || isVotePending || isOptimistic,
    },
    {
      id: "downvote",
      votes: totalDownvotes,
      tooltip: app.feedbackPage.details.downvote,
      icon: downvote ? PiArrowFatLineDownFill : PiArrowFatLineDown,
      color: "brand.quinary",
      onClick: (e) => {
        e.stopPropagation();
        handleDownvote();
      },
      disabled: !user || isVotePending || isOptimistic,
    },
  ];

  return (
    <HStack
      position="absolute"
      top={{ base: 1.5, sm: 3.5 }}
      right={{ base: 4, sm: 6 }}
    >
      {VOTE_BUTTONS.map(({ id, votes, tooltip, icon, disabled, ...rest }) => (
        <Tooltip
          key={id}
          hasArrow={false}
          trigger={
            <HStack gap={2} py={1} fontVariant="tabular-nums">
              <Icon src={icon} w={5} h={5} />
              {votes}
            </HStack>
          }
          triggerProps={{
            variant: "icon",
            bgColor: "transparent",
            ...rest,
          }}
          contentProps={{
            display: disabled ? "none" : undefined,
          }}
        >
          {tooltip}
        </Tooltip>
      ))}
    </HStack>
  );
};

export default VotingButtons;

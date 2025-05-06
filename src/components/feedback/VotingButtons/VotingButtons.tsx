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
  /** Feedback ID. */
  feedbackId: Post["rowId"];
  /** Project ID. */
  projectId: Project["rowId"];
  /* Whether the user has upvoted the feedback. */
  hasUpvoted: Partial<Upvote> | null | undefined;
  /* Whether the user has downvoted the feedback. */
  hasDownvoted: Partial<Downvote> | null | undefined;
  /** Total number of upvotes. */
  totalUpvotes: number;
  /** Total number of downvotes. */
  totalDownvotes: number;
}

const VotingButtons = ({
  feedbackId,
  projectId,
  hasUpvoted,
  hasDownvoted,
  totalUpvotes,
  totalDownvotes,
}: Props) => {
  const { mutate: handleUpvote } = useHandleUpvoteMutation({
    feedbackId,
    projectId,
    upvote: hasUpvoted,
    downvote: hasDownvoted,
  });

  const { mutate: handleDownvote } = useHandleDownvoteMutation({
    feedbackId,
    projectId,
    upvote: hasUpvoted,
    downvote: hasDownvoted,
  });

  const VOTE_BUTTONS: VoteButtonProps[] = [
    {
      id: "upvote",
      votes: totalUpvotes,
      tooltip: app.feedbackPage.details.upvote,
      icon: hasUpvoted ? PiArrowFatLineUpFill : PiArrowFatLineUp,
      color: "brand.tertiary",
      onClick: (e) => {
        e.stopPropagation();
        handleUpvote();
      },
    },
    {
      id: "downvote",
      votes: totalDownvotes,
      tooltip: app.feedbackPage.details.downvote,
      icon: hasDownvoted ? PiArrowFatLineDownFill : PiArrowFatLineDown,
      color: "brand.quinary",
      onClick: (e) => {
        e.stopPropagation();
        handleDownvote();
      },
    },
  ];

  return (
    <HStack
      position="absolute"
      top={{ base: 1.5, sm: 3.5 }}
      right={{ base: 4, sm: 6 }}
    >
      {VOTE_BUTTONS.map(({ id, votes, tooltip, icon, ...rest }) => (
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
  );
};

export default VotingButtons;

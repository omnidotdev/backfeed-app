import { HStack, Icon, Text, Tooltip } from "@omnidev/sigil";
import {
  PiArrowFatLineDown,
  PiArrowFatLineDownFill,
  PiArrowFatLineUp,
  PiArrowFatLineUpFill,
} from "react-icons/pi";
import { match } from "ts-pattern";

import { VoteType } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import useHandleVoteMutation from "@/lib/hooks/mutations/useHandleVoteMutation";

import type { Post, Project, Vote } from "@/generated/graphql";

interface Props {
  /** Feedback ID. */
  feedbackId: Post["rowId"];
  /** Project ID. */
  projectId: Project["rowId"];
  /** User's current vote on this post (if any) */
  userVote: Partial<Vote> | null | undefined;
  /** Total number of upvotes. */
  totalUpvotes: number;
  /** Total number of downvotes. */
  totalDownvotes: number;
  /** Whether voting is being handled from the dynamic feedback route. */
  isFeedbackRoute: boolean;
}

const VotingButtons = ({
  feedbackId,
  projectId,
  userVote,
  totalUpvotes,
  totalDownvotes,
  isFeedbackRoute,
}: Props) => {
  const { mutate: handleUpvote, isPending: isUpvotePending } =
    useHandleVoteMutation({
      feedbackId,
      projectId,
      userVote,
      voteType: VoteType.Up,
      isFeedbackRoute,
    });

  const { mutate: handleDownvote, isPending: isDownvotePending } =
    useHandleVoteMutation({
      feedbackId,
      projectId,
      userVote,
      voteType: VoteType.Down,
      isFeedbackRoute,
    });

  const hasUpvote = userVote?.voteType === VoteType.Up;
  const hasDownvote = userVote?.voteType === VoteType.Down;

  // NB: we set `rowId` to `pending` optimistically for these values on occasion. If an attempt at triggering a mutation happens while they are still in this state, the mutation will fail
  const isOptimistic = [feedbackId, userVote?.rowId].some(
    (state) => state === "pending",
  );

  const isVotePending = isUpvotePending || isDownvotePending;

  const netTotalVotes = totalUpvotes - totalDownvotes;

  const netVotesColor = match(netTotalVotes)
    .with(0, () => "gray.400")
    .when(
      (net) => net > 0,
      () => "brand.tertiary",
    )
    .otherwise(() => "brand.quinary");

  return (
    <HStack
      gap={1}
      justify="center"
      placeSelf="flex-start"
      mr={-2.5}
      mt={isFeedbackRoute ? -2 : -1}
    >
      <Tooltip
        hasArrow={false}
        trigger={
          <Icon
            src={hasUpvote ? PiArrowFatLineUpFill : PiArrowFatLineUp}
            w={5}
            h={5}
          />
        }
        triggerProps={{
          variant: "icon",
          bgColor: "transparent",
          color: "brand.tertiary",
          onClick: (e) => {
            e.stopPropagation();
            handleUpvote();
          },
          disabled: isVotePending || isOptimistic,
        }}
      >
        {app.feedbackPage.details.upvote}
      </Tooltip>

      <Text
        color={netVotesColor}
        whiteSpace="nowrap"
        fontVariant="tabular-nums"
      >
        {`${netTotalVotes > 0 ? "+" : ""}${netTotalVotes}`}
      </Text>

      <Tooltip
        hasArrow={false}
        trigger={
          <Icon
            src={hasDownvote ? PiArrowFatLineDownFill : PiArrowFatLineDown}
            w={5}
            h={5}
          />
        }
        triggerProps={{
          variant: "icon",
          bgColor: "transparent",
          color: "brand.quinary",
          onClick: (e) => {
            e.stopPropagation();
            handleDownvote();
          },
          disabled: isVotePending || isOptimistic,
        }}
      >
        {app.feedbackPage.details.downvote}
      </Tooltip>
    </HStack>
  );
};

export default VotingButtons;

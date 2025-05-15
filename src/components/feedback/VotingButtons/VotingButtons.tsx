import { HStack, Icon, Text, Tooltip } from "@omnidev/sigil";
import {
  PiArrowFatLineDown,
  PiArrowFatLineDownFill,
  PiArrowFatLineUp,
  PiArrowFatLineUpFill,
} from "react-icons/pi";
import { match } from "ts-pattern";

import { app } from "lib/config";
import {
  useHandleDownvoteMutation,
  useHandleUpvoteMutation,
} from "lib/hooks/mutations";

import type { Downvote, Post, Project, Upvote } from "generated/graphql";

interface Props {
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
  /** Whether voting is being handled from the dynamic feedback route. */
  isFeedbackRoute: boolean;
}

const VotingButtons = ({
  feedbackId,
  projectId,
  upvote,
  downvote,
  totalUpvotes,
  totalDownvotes,
  isFeedbackRoute,
}: Props) => {
  const { mutate: handleUpvote, isPending: isUpvotePending } =
    useHandleUpvoteMutation({
      feedbackId,
      projectId,
      upvote,
      downvote,
      isFeedbackRoute,
    });

  const { mutate: handleDownvote, isPending: isDownvotePending } =
    useHandleDownvoteMutation({
      feedbackId,
      projectId,
      upvote,
      downvote,
      isFeedbackRoute,
    });

  // NB: we set `rowId` to `pending` optimistically for these values on occasion. If an attempt at triggering a mutation happens while they are still in this state, the mutation will fail
  const isOptimistic = [feedbackId, upvote?.rowId, downvote?.rowId].some(
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
    <HStack gap={1} justify="center" placeSelf="flex-start" mr={-2.5} mt={-2}>
      <Tooltip
        hasArrow={false}
        trigger={
          <Icon
            src={upvote ? PiArrowFatLineUpFill : PiArrowFatLineUp}
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
            src={downvote ? PiArrowFatLineDownFill : PiArrowFatLineDown}
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

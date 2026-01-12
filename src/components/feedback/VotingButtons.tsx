import { Flex, Icon, Text, Tooltip, css } from "@omnidev/sigil";
import { LuArrowDown, LuArrowUp } from "react-icons/lu";
import { match } from "ts-pattern";

import LoginPrompt from "@/components/auth/LoginPrompt";
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
  /** Whether the user is authenticated. */
  isAuthenticated?: boolean;
}

const VotingButtons = ({
  feedbackId,
  projectId,
  userVote,
  totalUpvotes,
  totalDownvotes,
  isFeedbackRoute,
  isAuthenticated = true,
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

  const voteColor = match(true)
    .with(hasUpvote, () => ({ base: "primary.500", _dark: "primary.400" }))
    .with(hasDownvote, () => ({ base: "red.500", _dark: "red.400" }))
    .otherwise(() => ({
      base: "foreground.default",
      _dark: "foreground.default",
    }));

  const borderColor = match(true)
    .with(hasUpvote, () => ({ base: "primary.200", _dark: "primary.800" }))
    .with(hasDownvote, () => ({ base: "red.200", _dark: "red.800" }))
    .otherwise(() => ({ base: "neutral.200", _dark: "neutral.700" }));

  const bgColor = match(true)
    .with(hasUpvote, () => ({ base: "primary.50", _dark: "primary.950/30" }))
    .with(hasDownvote, () => ({ base: "red.50", _dark: "red.950/30" }))
    .otherwise(() => ({ base: "white", _dark: "neutral.800" }));

  // Show login prompt for unauthenticated users
  if (!isAuthenticated) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        minW={12}
        py={2}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={{ base: "neutral.200", _dark: "neutral.700" }}
        bgColor={{ base: "white", _dark: "neutral.800" }}
        className={css({ transition: "all 0.2s ease" })}
      >
        <LoginPrompt action="vote" variant="ghost" size="xs" p={0}>
          <Icon
            src={LuArrowUp}
            w={4}
            h={4}
            color={{ base: "primary.500", _dark: "primary.400" }}
          />
        </LoginPrompt>
        <Text
          fontSize="sm"
          fontWeight="bold"
          color="foreground.default"
          mt={0.5}
        >
          {netTotalVotes}
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minW={12}
      py={2}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      bgColor={bgColor}
      className={css({ transition: "all 0.2s ease" })}
    >
      <Tooltip
        hasArrow={false}
        trigger={
          <Icon src={LuArrowUp} w={4} h={4} strokeWidth={hasUpvote ? 3 : 2} />
        }
        triggerProps={{
          variant: "ghost",
          size: "xs",
          p: 0,
          minW: "auto",
          h: "auto",
          color: hasUpvote
            ? { base: "primary.500", _dark: "primary.400" }
            : { base: "foreground.muted", _dark: "foreground.muted" },
          _hover: {
            color: { base: "primary.500", _dark: "primary.400" },
            bgColor: "transparent",
          },
          onClick: (e) => {
            e.stopPropagation();
            handleUpvote();
          },
          disabled: isVotePending || isOptimistic,
        }}
      >
        {app.feedbackPage.details.upvote}
      </Tooltip>

      <Text fontSize="sm" fontWeight="bold" color={voteColor} mt={0.5}>
        {netTotalVotes}
      </Text>

      <Tooltip
        hasArrow={false}
        trigger={
          <Icon
            src={LuArrowDown}
            w={4}
            h={4}
            strokeWidth={hasDownvote ? 3 : 2}
          />
        }
        triggerProps={{
          variant: "ghost",
          size: "xs",
          p: 0,
          minW: "auto",
          h: "auto",
          color: hasDownvote
            ? { base: "red.500", _dark: "red.400" }
            : { base: "foreground.muted", _dark: "foreground.muted" },
          _hover: {
            color: { base: "red.500", _dark: "red.400" },
            bgColor: "transparent",
          },
          onClick: (e) => {
            e.stopPropagation();
            handleDownvote();
          },
          disabled: isVotePending || isOptimistic,
        }}
      >
        {app.feedbackPage.details.downvote}
      </Tooltip>
    </Flex>
  );
};

export default VotingButtons;

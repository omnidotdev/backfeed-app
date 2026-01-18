import { Button, Flex, Icon, Text, css } from "@omnidev/sigil";
import { LuArrowDown, LuArrowUp } from "react-icons/lu";

import SignInPrompt from "@/components/auth/SignInPrompt";
import { VoteType } from "@/generated/graphql";
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
  /** Current user's rowId for vote ownership. */
  userId?: string;
}

const VotingButtons = ({
  feedbackId,
  projectId,
  userVote,
  totalUpvotes,
  totalDownvotes,
  isFeedbackRoute,
  isAuthenticated = true,
  userId,
}: Props) => {
  const { mutate: handleUpvote, isPending: isUpvotePending } =
    useHandleVoteMutation({
      feedbackId,
      projectId,
      userVote,
      voteType: VoteType.Up,
      isFeedbackRoute,
      userId,
    });

  const { mutate: handleDownvote, isPending: isDownvotePending } =
    useHandleVoteMutation({
      feedbackId,
      projectId,
      userVote,
      voteType: VoteType.Down,
      isFeedbackRoute,
      userId,
    });

  const hasUpvote = userVote?.voteType === VoteType.Up;
  const hasDownvote = userVote?.voteType === VoteType.Down;

  // NB: we set `rowId` to `pending` optimistically for these values on occasion. If an attempt at triggering a mutation happens while they are still in this state, the mutation will fail
  const isOptimistic = [feedbackId, userVote?.rowId].some(
    (state) => state === "pending",
  );

  const isVotePending = isUpvotePending || isDownvotePending;

  const netTotalVotes = totalUpvotes - totalDownvotes;

  const voteColor = hasUpvote
    ? { base: "ruby.500", _dark: "ruby.400" }
    : hasDownvote
      ? { base: "ruby.500", _dark: "ruby.400" }
      : { base: "foreground.default", _dark: "foreground.default" };

  const borderColor = hasUpvote
    ? { base: "ruby.200", _dark: "ruby.800" }
    : hasDownvote
      ? { base: "ruby.200", _dark: "ruby.800" }
      : { base: "neutral.200", _dark: "neutral.700" };

  const bgColor = hasUpvote
    ? { base: "ruby.50", _dark: "ruby.950/30" }
    : hasDownvote
      ? { base: "ruby.50", _dark: "ruby.950/30" }
      : { base: "white", _dark: "neutral.800" };

  // Show login prompt for unauthenticated users
  if (!isAuthenticated) {
    return (
      <SignInPrompt action="vote">
        <Flex
          direction="column"
          align="center"
          justify="center"
          minW={12}
          py={2}
          mr={3}
          borderRadius="lg"
          borderWidth="1px"
          borderColor={{ base: "neutral.200", _dark: "neutral.700" }}
          bgColor={{ base: "white", _dark: "neutral.800" }}
          className={css({ transition: "all 0.2s ease" })}
        >
          <Icon
            src={LuArrowUp}
            w={4}
            h={4}
            color={{ base: "foreground.muted", _dark: "foreground.muted" }}
          />
          <Text
            fontSize="lg"
            fontWeight="bold"
            color="foreground.default"
            lineHeight={1}
            my={1}
          >
            {netTotalVotes}
          </Text>
          <Icon
            src={LuArrowDown}
            w={4}
            h={4}
            color={{ base: "foreground.muted", _dark: "foreground.muted" }}
          />
        </Flex>
      </SignInPrompt>
    );
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minW={12}
      py={2}
      mr={3}
      borderRadius="lg"
      borderWidth="1px"
      borderColor={borderColor}
      bgColor={bgColor}
      className={css({ transition: "all 0.2s ease" })}
    >
      <Button
        variant="ghost"
        size="xs"
        p={0}
        minW="auto"
        h="auto"
        className={css({
          color: hasUpvote
            ? { base: "ruby.500", _dark: "ruby.400" }
            : { base: "foreground.muted", _dark: "foreground.muted" },
          _hover: {
            color: { base: "ruby.500", _dark: "ruby.400" },
            bgColor: "transparent",
          },
        })}
        onClick={(e) => {
          e.stopPropagation();
          handleUpvote();
        }}
        disabled={isVotePending || isOptimistic}
      >
        <Icon src={LuArrowUp} w={4} h={4} strokeWidth={hasUpvote ? 3 : 2} />
      </Button>

      <Text
        fontSize="lg"
        fontWeight="bold"
        color={voteColor}
        lineHeight={1}
        my={1}
      >
        {netTotalVotes}
      </Text>

      <Button
        variant="ghost"
        size="xs"
        p={0}
        minW="auto"
        h="auto"
        className={css({
          color: hasDownvote
            ? { base: "ruby.500", _dark: "ruby.400" }
            : { base: "foreground.muted", _dark: "foreground.muted" },
          _hover: {
            color: { base: "ruby.500", _dark: "ruby.400" },
            bgColor: "transparent",
          },
        })}
        onClick={(e) => {
          e.stopPropagation();
          handleDownvote();
        }}
        disabled={isVotePending || isOptimistic}
      >
        <Icon src={LuArrowDown} w={4} h={4} strokeWidth={hasDownvote ? 3 : 2} />
      </Button>
    </Flex>
  );
};

export default VotingButtons;

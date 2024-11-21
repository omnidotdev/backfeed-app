import { Flex, HStack, Skeleton, Stack, Text } from "@omnidev/sigil";
import dayjs from "dayjs";
import { useState } from "react";
import {
  BsHandThumbsDown,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
} from "react-icons/bs";

import { VoteButton } from "components/feedback";
import { ErrorBoundary, SectionContainer } from "components/layout";
import { app } from "lib/config";

import type { VoteButtonProps } from "components/feedback";

export interface Feedback {
  /** Feedback ID. */
  id: string;
  /** Feedback title. */
  title: string;
  /** Feedback description. */
  description: string;
  /** Feedback created date. */
  createdAt: string;
  /** Feedback updated date. */
  updatedAt: string;
  /** Feedback status. */
  status: "New" | "Planned" | "In Progress" | "Complete";
  /** Total upvotes for the feedback. */
  upvotes: number;
  /** Total downvotes for the feedback. */
  downvotes: number;
  /** User who created the feedback. */
  user: {
    /** User ID. */
    id: string;
    /** User first name. */
    firstName: string;
    /** User last name. */
    lastName: string;
  };
}

interface Props {
  /** Feedback details. */
  feedback: Feedback | null | undefined;
  /** Whether the feedback data is loaded. */
  isLoaded?: boolean;
  /** Whether loading the feedback data encountered an error. */
  isError?: boolean;
}

/**
 * Feedback details section.
 */
const FeedbackDetails = ({ feedback, isLoaded = true, isError }: Props) => {
  const [votingState, setVotingState] = useState<{
    hasUpvoted: boolean;
    hasDownvoted: boolean;
  }>({ hasUpvoted: false, hasDownvoted: false });

  const isVotingDisabled = !isLoaded || isError;

  const VOTE_BUTTONS: VoteButtonProps[] = [
    {
      id: "upvote",
      votes: votingState.hasUpvoted
        ? (feedback?.upvotes ?? 0) + 1
        : feedback?.upvotes,
      icon: votingState.hasUpvoted ? BsHandThumbsUpFill : BsHandThumbsUp,
      color: "omni.emerald",
      borderColor: "omni.emerald",
      disabled: isVotingDisabled,
      onClick: () =>
        setVotingState((prev) => ({
          hasUpvoted: !prev.hasUpvoted,
          hasDownvoted: false,
        })),
    },
    {
      id: "downvote",
      votes: votingState.hasDownvoted
        ? (feedback?.downvotes ?? 0) + 1
        : feedback?.downvotes,
      icon: votingState.hasDownvoted ? BsHandThumbsDownFill : BsHandThumbsDown,
      color: "omni.ruby",
      borderColor: "omni.ruby",
      disabled: isVotingDisabled,
      onClick: () =>
        setVotingState((prev) => ({
          hasUpvoted: false,
          hasDownvoted: !prev.hasDownvoted,
        })),
    },
  ];

  return (
    <SectionContainer
      title={app.feedbackPage.details.title}
      description={app.feedbackPage.details.description}
    >
      {isError ? (
        <ErrorBoundary message="Error fetching feedback details" h={52} />
      ) : (
        <HStack gap={8}>
          <Stack w="full">
            <Skeleton isLoaded={isLoaded} maxW={!isLoaded ? 48 : undefined}>
              <Text fontWeight="semibold" fontSize="lg">
                {feedback?.title}
              </Text>
            </Skeleton>

            <Skeleton isLoaded={isLoaded} minH={!isLoaded ? 24 : undefined}>
              <Text color="foreground.subtle">{feedback?.description}</Text>
            </Skeleton>

            <Stack justify="space-between" gap={4}>
              <HStack color="foreground.muted" fontSize="sm">
                <Skeleton isLoaded={isLoaded}>
                  <Text>
                    {feedback?.user.firstName} {feedback?.user.lastName}
                  </Text>
                </Skeleton>

                <Flex
                  borderRadius="full"
                  h={1}
                  w={1}
                  bgColor="foreground.muted"
                />

                <Skeleton isLoaded={isLoaded}>
                  <Text color="foreground.muted">
                    {dayjs(feedback?.createdAt).fromNow()}
                  </Text>
                </Skeleton>
              </HStack>

              <HStack fontSize="sm" placeSelf="flex-end" gap={4}>
                {VOTE_BUTTONS.map(({ id, votes, icon, ...rest }) => (
                  <Skeleton key={id} isLoaded={isLoaded} h={7}>
                    <VoteButton key={id} votes={votes} icon={icon} {...rest} />
                  </Skeleton>
                ))}
              </HStack>
            </Stack>
          </Stack>
        </HStack>
      )}
    </SectionContainer>
  );
};

export default FeedbackDetails;

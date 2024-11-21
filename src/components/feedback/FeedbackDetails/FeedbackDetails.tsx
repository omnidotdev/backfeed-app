import { Badge, Flex, HStack, Stack, Text } from "@omnidev/sigil";
import dayjs from "dayjs";
import { useState } from "react";
import {
  BsHandThumbsDown,
  BsHandThumbsDownFill,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
} from "react-icons/bs";

import { VoteButton } from "components/feedback";
import { SectionContainer } from "components/layout";
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
  feedback: Feedback;
}

/**
 * Feedback details section.
 */
const FeedbackDetails = ({
  feedback: { title, description, createdAt, status, upvotes, downvotes, user },
}: Props) => {
  const [votingState, setVotingState] = useState<{
    hasUpvoted: boolean;
    hasDownvoted: boolean;
  }>({ hasUpvoted: false, hasDownvoted: false });

  const VOTE_BUTTONS: VoteButtonProps[] = [
    {
      id: "upvote",
      votes: votingState.hasUpvoted ? upvotes + 1 : upvotes,
      icon: votingState.hasUpvoted ? BsHandThumbsUpFill : BsHandThumbsUp,
      color: "omni.emerald",
      borderColor: "omni.emerald",
      onClick: () =>
        setVotingState((prev) => ({
          hasUpvoted: !prev.hasUpvoted,
          hasDownvoted: false,
        })),
    },
    {
      id: "downvote",
      votes: votingState.hasDownvoted ? downvotes + 1 : downvotes,
      icon: votingState.hasDownvoted ? BsHandThumbsDownFill : BsHandThumbsDown,
      color: "omni.ruby",
      borderColor: "omni.ruby",
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
      <HStack gap={8}>
        <Stack>
          <Text fontWeight="semibold" fontSize="lg">
            {title}
          </Text>

          <Text color="foreground.subtle">{description}</Text>

          <HStack justify="space-between">
            <HStack color="foreground.muted" fontSize="sm">
              <Text>
                {user.firstName} {user.lastName}
              </Text>

              <Flex
                borderRadius="full"
                h={1}
                w={1}
                bgColor="foreground.muted"
              />

              <Text color="foreground.muted">{dayjs(createdAt).fromNow()}</Text>
            </HStack>

            <HStack gap={4}>
              <Badge>{status}</Badge>

              <HStack fontSize="sm" placeSelf="flex-start" gap={4}>
                {VOTE_BUTTONS.map(({ id, votes, icon, ...rest }) => (
                  <VoteButton key={id} votes={votes} icon={icon} {...rest} />
                ))}
              </HStack>
            </HStack>
          </HStack>
        </Stack>
      </HStack>
    </SectionContainer>
  );
};

export default FeedbackDetails;

import { Badge, Flex, HStack, Stack, Text, VStack } from "@omnidev/sigil";
import dayjs from "dayjs";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

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
  const VOTE_BUTTONS: VoteButtonProps[] = [
    {
      id: "upvote",
      votes: upvotes,
      icon: FiArrowUp,
      color: "omni.emerald",
      borderColor: "omni.emerald",
      backgroundColor: {
        base: { base: "omni.emerald.50", _dark: "omni.emerald.950" },
        _hover: { base: "omni.emerald.100", _dark: "omni.emerald.900" },
      },
    },
    {
      id: "downvote",
      votes: downvotes,
      icon: FiArrowDown,
      color: "omni.ruby",
      borderColor: "omni.ruby",
      backgroundColor: {
        base: { base: "omni.ruby.50", _dark: "omni.ruby.950" },
        _hover: { base: "omni.ruby.100", _dark: "omni.ruby.900" },
      },
      contentProps: {
        flexDirection: "column-reverse",
      },
    },
  ];

  return (
    <SectionContainer
      title={app.feedbackPage.details.title}
      description={app.feedbackPage.details.description}
    >
      <HStack borderTopWidth="1px" px={4} pt={4} gap={8}>
        <VStack fontSize="sm" placeSelf="flex-start" gap={2}>
          {VOTE_BUTTONS.map(({ id, votes, icon, ...rest }) => (
            <VoteButton key={id} votes={votes} icon={icon} {...rest} />
          ))}
        </VStack>

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

            <Badge>{status}</Badge>
          </HStack>
        </Stack>
      </HStack>
    </SectionContainer>
  );
};

export default FeedbackDetails;

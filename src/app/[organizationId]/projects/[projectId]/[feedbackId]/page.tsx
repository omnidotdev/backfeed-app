"use client";

import {
  Badge,
  Button,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from "@omnidev/sigil";
import dayjs from "dayjs";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { FiArrowDown, FiArrowLeft, FiArrowUp } from "react-icons/fi";

import { VoteButton } from "components/feedback";
import { SectionContainer } from "components/layout";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

import type { VoteButtonProps } from "components/feedback";

interface Feedback {
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

/**
 * Feedback overview page.
 */
const FeedbackPage = () => {
  const { isAuthenticated } = useAuth();

  const { feedbackId, organizationId, projectId } = useParams<{
    feedbackId: string;
    organizationId: string;
    projectId: string;
  }>();

  const FEEDBACK: Feedback = {
    id: feedbackId,
    title: "I Still Like Turtles",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor.",
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
    status: "Planned",
    upvotes: 420,
    downvotes: 69,
    user: {
      id: "1",
      firstName: "Back",
      lastName: "Feed",
    },
  };

  const VOTE_BUTTONS: VoteButtonProps[] = [
    {
      id: "upvote",
      votes: FEEDBACK.upvotes,
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
      votes: FEEDBACK.downvotes,
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

  if (!isAuthenticated) notFound();

  return (
    <Stack h="full" maxW="8xl" mx="auto" p={6} gap={6}>
      <Link href={`/${organizationId}/projects/${projectId}`}>
        <Button
          variant="ghost"
          size="lg"
          _hover={{ bgColor: "background.muted" }}
        >
          <Icon src={FiArrowLeft} w={4} h={4} />

          {app.feedbackPage.backToProject}
        </Button>
      </Link>

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
              {FEEDBACK.title}
            </Text>

            <Text color="foreground.subtle">{FEEDBACK.description}</Text>

            <HStack justify="space-between">
              <HStack color="foreground.muted" fontSize="sm">
                <Text>
                  {FEEDBACK.user.firstName} {FEEDBACK.user.lastName}
                </Text>

                <Flex
                  borderRadius="full"
                  h={1}
                  w={1}
                  bgColor="foreground.muted"
                />

                <Text color="foreground.muted">
                  {dayjs(FEEDBACK.createdAt).fromNow()}
                </Text>
              </HStack>

              <Badge>{FEEDBACK.status}</Badge>
            </HStack>
          </Stack>
        </HStack>
      </SectionContainer>
    </Stack>
  );
};

export default FeedbackPage;

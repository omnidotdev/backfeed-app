"use client";

import { Button, Icon, Stack } from "@omnidev/sigil";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

import { app } from "lib/config";
import { useAuth } from "lib/hooks";

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
    title: "I still like turtles.",
    description: "Turtles are the best.",
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
    </Stack>
  );
};

export default FeedbackPage;

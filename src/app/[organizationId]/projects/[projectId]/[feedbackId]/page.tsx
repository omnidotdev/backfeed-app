"use client";

import { Button, Icon, Stack } from "@omnidev/sigil";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

import { Comments, FeedbackDetails } from "components/feedback";
import { app } from "lib/config";
import { useAuth, useDataState } from "lib/hooks";

import type { Feedback } from "components/feedback";

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

  const { isLoading, isError } = useDataState({ timeout: 400 });

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

      <FeedbackDetails
        feedback={FEEDBACK}
        isLoaded={!isLoading}
        isError={isError}
      />

      <Comments />
    </Stack>
  );
};

export default FeedbackPage;

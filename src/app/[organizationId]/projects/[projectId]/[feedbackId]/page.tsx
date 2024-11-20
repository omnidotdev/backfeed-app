"use client";

import { Text, VStack } from "@omnidev/sigil";
import { notFound, useParams } from "next/navigation";

import { useAuth } from "lib/hooks";

/**
 * Feedback overview page.
 */
const FeedbackPage = () => {
  const { isAuthenticated } = useAuth();

  const { feedbackId } = useParams<{ feedbackId: string }>();

  if (!isAuthenticated) notFound();

  return (
    <VStack justify="center" h="full">
      <Text>Feedback ID: {feedbackId}</Text>
    </VStack>
  );
};

export default FeedbackPage;

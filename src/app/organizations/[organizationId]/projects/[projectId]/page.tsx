"use client";

import { Text, VStack } from "@omnidev/sigil";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

import { useAuth } from "lib/hooks";

interface ProjectFeedback {
  /** Feedback ID. */
  id: string;
  /** Feedback title. */
  title: string;
}

const FEEDBACK: ProjectFeedback[] = [
  {
    id: "1",
    title: "I still like turtles.",
  },
  {
    id: "2",
    title: "The new dashboard layout is much more intuitive!",
  },
  {
    id: "3",
    title: "Having issues with the new export feature.",
  },
  {
    id: "4",
    title: "Would love to be able to export feedback.",
  },
];

/**
 * Project overview page.
 */
const ProjectPage = () => {
  const { isAuthenticated } = useAuth();

  const params = useParams<{ organizationId: string; projectId: string }>();

  if (!isAuthenticated) notFound();

  return (
    <VStack justify="center" h="full" gap={4}>
      <Text>Project: {params.projectId}</Text>
      {FEEDBACK.map((feedback) => (
        <Link
          key={feedback.id}
          href={`/organizations/${params.organizationId}/projects/${params.projectId}/${feedback.id}`}
        >
          {feedback.title}
        </Link>
      ))}
    </VStack>
  );
};

export default ProjectPage;

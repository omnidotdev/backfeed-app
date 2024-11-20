"use client";

import { Text, VStack } from "@omnidev/sigil";
import { notFound, useParams } from "next/navigation";

import { useAuth } from "lib/hooks";

/**
 * Project overview page.
 */
const ProjectPage = () => {
  const { isAuthenticated } = useAuth();

  const params = useParams<{ organizationId: string; projectId: string }>();

  if (!isAuthenticated) notFound();

  return (
    <VStack justify="center" h="full">
      <Text>Project: {params.projectId}</Text>
    </VStack>
  );
};

export default ProjectPage;

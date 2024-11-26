"use client";

import { Text, VStack } from "@omnidev/sigil";
import { notFound } from "next/navigation";

import { useAuth } from "lib/hooks";

/**
 * Projects overview page.
 */
const ProjectsPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) notFound();

  return (
    <VStack justify="center" h="full">
      <Text>Projects</Text>
    </VStack>
  );
};

export default ProjectsPage;
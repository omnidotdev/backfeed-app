"use client";

import { Stack, VStack } from "@omnidev/sigil";
import { notFound } from "next/navigation";
import { LuPlusCircle } from "react-icons/lu";

import { PageHeader } from "components/layout";
import { ProjectFilters } from "components/project";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

/**
 * Projects overview page.
 */
const ProjectsPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) notFound();

  return (
    <Stack maxW="8xl" mx="auto" p={6} gap={6}>
      <PageHeader
        title={app.projectsPage.header.title}
        description={app.projectsPage.header.description}
        cta={[
          {
            label: app.projectsPage.header.cta.newProject.label,
            icon: LuPlusCircle,
          },
        ]}
      />

      <ProjectFilters />

      <VStack>Projects Table</VStack>
    </Stack>
  );
};

export default ProjectsPage;

"use client";

import { Stack } from "@omnidev/sigil";
import { notFound } from "next/navigation";
import { LuPlusCircle } from "react-icons/lu";

import { PageHeader } from "components/layout";
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
    </Stack>
  );
};

export default ProjectsPage;

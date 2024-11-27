"use client";
import { notFound } from "next/navigation";
import { LuPlusCircle } from "react-icons/lu";

import { Page } from "components/layout";
import { ProjectFilters, ProjectList } from "components/project";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

/**
 * Projects overview page.
 */
const ProjectsPage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) notFound();

  return (
    <Page
      header={{
        title: app.projectsPage.header.title,
        description: app.projectsPage.header.description,
        cta: [
          {
            label: app.projectsPage.header.cta.newProject.label,
            icon: LuPlusCircle,
          },
        ],
      }}
    >
      <ProjectFilters />

      <ProjectList />
    </Page>
  );
};

export default ProjectsPage;

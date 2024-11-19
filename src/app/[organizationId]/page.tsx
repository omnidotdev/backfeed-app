"use client";

import { Grid, Stack } from "@omnidev/sigil";
import { useParams } from "next/navigation";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuPlusCircle } from "react-icons/lu";

import { PageHeader } from "components/layout";
import {
  OrganizationActions,
  OrganizationMetrics,
  OrganizationProjectsOverview,
  PROJECTS,
} from "components/organization";
import { app } from "lib/config";
import { useDataState } from "lib/hooks";

/**
 * Organization overview page.
 */
const OrganizationPage = () => {
  const params = useParams<{ organizationId: string }>();

  const { isLoading, isError } = useDataState();

  // TODO: Probably use an aggregate query to get this information
  const totalProjects = PROJECTS.length,
    totalFeedback = PROJECTS.reduce(
      (acc, project) => acc + project.totalFeedback,
      0
    ),
    activeUsers = PROJECTS.reduce(
      (acc, project) => acc + project.activeUsers,
      0
    );

  return (
    <Stack maxW="8xl" mx="auto" p={6} gap={6}>
      <PageHeader
        // TODO: Dont use orgId here, use org name once query set up
        title={params.organizationId}
        description={app.organizationPage.header.description}
        // TODO: add button actions
        cta={[
          {
            label: app.organizationPage.header.cta.viewAllProjects.label,
            icon: HiOutlineFolder,
            variant: "outline",
          },
          {
            label: app.organizationPage.header.cta.newProject.label,
            icon: LuPlusCircle,
          },
        ]}
      />

      <OrganizationProjectsOverview />

      <Grid columns={{ base: 1, md: 2 }} gap={6}>
        <OrganizationMetrics
          totalProjects={totalProjects}
          totalFeedback={totalFeedback}
          activeUsers={activeUsers}
          isLoaded={!isLoading}
          isError={isError}
        />

        <OrganizationActions />
      </Grid>
    </Stack>
  );
};

export default OrganizationPage;

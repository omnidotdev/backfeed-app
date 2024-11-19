"use client";

import { Grid, Stack } from "@omnidev/sigil";
import {
  OrganizationActions,
  OrganizationHeader,
  OrganizationProjectsOverview,
  OrganizationMetrics,
  PROJECTS,
} from "components/organization";
import { useDataState } from "lib/hooks";
import { useParams } from "next/navigation";

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
      <OrganizationHeader
        // TODO: Dont use orgId here, use org name once query set up
        organizationName={params.organizationId}
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

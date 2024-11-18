"use client";

import { Grid, Stack } from "@omnidev/sigil";
import {
  OrganizationActions,
  OrganizationHeader,
  OrganizationOverview,
  OrganizationStats,
} from "components/organization";
import { projects } from "components/organization/OrganizationOverview/OrganizationOverview";
import { useDataState } from "lib/hooks";
import { useParams } from "next/navigation";

/**
 * Organization overview page.
 */
const OrganizationPage = () => {
  const params = useParams<{ organizationId: string }>();

  const { isLoading, isError } = useDataState();

  // TODO: Probably use an aggregate query to get this information
  const totalProjects = projects.length,
    totalFeedback = projects.reduce(
      (acc, project) => acc + project.totalFeedback,
      0
    ),
    activeUsers = projects.reduce(
      (acc, project) => acc + project.activeUsers,
      0
    );

  return (
    <Stack maxW="8xl" mx="auto" p={6} gap={6}>
      <OrganizationHeader
        // TODO: Dont use orgId here, use org name once query set up
        organizationName={params.organizationId}
      />

      <OrganizationOverview />

      <Grid columns={{ base: 1, md: 2 }} gap={6}>
        <OrganizationStats
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

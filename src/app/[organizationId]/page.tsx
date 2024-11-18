"use client";

import { Grid, Stack } from "@omnidev/sigil";
import { Actions, Header, Overview, Stats } from "components/organization";
import { useDataState } from "lib/hooks";
import { useParams } from "next/navigation";

export interface OrganizationProject {
  id: string;
  name: string;
  description: string;
  totalFeedback: number;
  activeUsers: number;
  lastUpdated: string;
}

const projects: OrganizationProject[] = [
  {
    id: "1",
    name: "Mobile App Feedback",
    description:
      "Collecting user feedback for our iOS and Android applications",
    totalFeedback: 234,
    activeUsers: 1200,
    lastUpdated: "2024-11-05T18:40:27.761Z",
  },
  {
    id: "2",
    name: "Web Platform Beta",
    description: "Beta testing feedback for the new web platform",
    totalFeedback: 567,
    activeUsers: 890,
    lastUpdated: "2024-11-17T18:40:27.761Z",
  },
  {
    id: "3",
    name: "Desktop Client",
    description: "User experience feedback for desktop applications",
    totalFeedback: 123,
    activeUsers: 450,
    lastUpdated: "2024-11-12T18:40:27.761Z",
  },
];

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
    <Stack p={6} gap={6}>
      <Header
        // TODO: Dont use orgId here, use org name once query set up
        organizationName={params.organizationId}
      />

      <Overview projects={projects} />

      <Grid columns={{ base: 1, md: 2 }} gap={6}>
        <Stats
          totalProjects={totalProjects}
          totalFeedback={totalFeedback}
          activeUsers={activeUsers}
          isLoaded={!isLoading}
          isError={isError}
        />
        <Actions />
      </Grid>
    </Stack>
  );
};

export default OrganizationPage;

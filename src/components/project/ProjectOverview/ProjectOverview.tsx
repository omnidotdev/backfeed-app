"use client";

import { Grid, GridItem, Stack } from "@omnidev/sigil";

import {
  FeedbackMetrics,
  ProjectFeedback,
  ProjectInformation,
  StatusBreakdown,
} from "components/project";

import { useProjectMetricsQuery, type Project } from "generated/graphql";

interface Props {
  /** Name of the project. */
  name: Project["name"];
  /** Description of the project. */
  description: Project["description"];
  /** Date the project was created. */
  createdAt: Project["createdAt"];
  /** Project ID. */
  projectId: Project["id"];
}

const ProjectOverview = ({
  name,
  description,
  createdAt,
  projectId,
}: Props) => {
  const {
    data: projectMetrics,
    isLoading,
    isError,
  } = useProjectMetricsQuery(
    {
      projectId,
    },
    {
      select: (data) => ({
        activeUsers: data?.project?.posts.aggregates?.distinctCount?.userId,
        totalFeedback: data?.project?.posts.totalCount,
        totalUpvotes: data?.upvotes?.totalCount,
      }),
    }
  );

  return (
    <Grid h="100%" columns={{ lg: 3 }} gap={6}>
      <GridItem h="100%" colSpan={{ lg: 2 }}>
        <ProjectFeedback projectId={projectId} />
      </GridItem>

      <GridItem h="100%">
        <Stack gap={6}>
          <ProjectInformation
            name={name!}
            description={description!}
            createdAt={createdAt}
            activeUsers={Number(projectMetrics?.activeUsers) ?? 0}
            isLoaded={!isLoading}
            isError={isError}
          />

          <FeedbackMetrics
            totalFeedback={projectMetrics?.totalFeedback ?? 0}
            totalUpvotes={projectMetrics?.totalUpvotes ?? 0}
            isLoaded={!isLoading}
            isError={isError}
          />

          <StatusBreakdown />
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default ProjectOverview;

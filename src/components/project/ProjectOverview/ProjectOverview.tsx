"use client";

import { Grid, GridItem, Stack } from "@omnidev/sigil";
import dayjs from "dayjs";

import {
  FeedbackMetrics,
  ProjectFeedback,
  ProjectInformation,
  StatusBreakdown,
} from "components/project";

import { useProjectMetricsQuery, type Project } from "generated/graphql";

interface Props {
  /** Project ID. */
  projectId: Project["id"];
}

const ProjectOverview = ({ projectId }: Props) => {
  const { data, isLoading, isError } = useProjectMetricsQuery(
    {
      projectId,
    },
    {
      select: (data) => ({
        createdAt: data?.project?.createdAt,
        activeUsers: data?.project?.posts.aggregates?.distinctCount?.userId,
        totalFeedback: data?.project?.posts.totalCount,
        totalEngagement:
          (data?.upvotes?.totalCount ?? 0) + (data?.downvotes?.totalCount ?? 0),
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
            createdAt={dayjs(data?.createdAt).format("M/D/YYYY")}
            activeUsers={Number(data?.activeUsers ?? 0)}
            isLoaded={!isLoading}
            isError={isError}
          />

          <FeedbackMetrics
            totalFeedback={data?.totalFeedback ?? 0}
            totalEngagement={data?.totalEngagement ?? 0}
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

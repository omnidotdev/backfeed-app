"use client";

import { Grid, GridItem, Stack } from "@omnidev/sigil";
import { useSuspenseQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import {
  FeedbackMetrics,
  ProjectFeedback,
  ProjectInformation,
  StatusBreakdown,
} from "components/project";
import { projectMetricsQueryOptions } from "lib/react-query/options";

import type { Project } from "generated/graphql";

interface Props {
  /** Project ID. */
  projectId: Project["rowId"];
}

const ProjectOverview = ({ projectId }: Props) => {
  const { data, isError } = useSuspenseQuery({
    ...projectMetricsQueryOptions({
      projectId,
    }),

    select: (data) => ({
      createdAt: dayjs(data?.project?.createdAt).format("M/D/YYYY"),
      activeUsers: Number(
        data?.project?.posts.aggregates?.distinctCount?.userId
      ),
      totalFeedback: data?.project?.posts.totalCount,
      totalEngagement:
        (data?.upvotes?.totalCount ?? 0) + (data?.downvotes?.totalCount ?? 0),
    }),
  });

  return (
    <Grid columns={{ lg: 3 }} gap={6}>
      <GridItem colSpan={{ lg: 2 }}>
        <ProjectFeedback projectId={projectId} />
      </GridItem>

      <GridItem>
        <Stack gap={6}>
          <ProjectInformation
            createdAt={data?.createdAt}
            activeUsers={data?.activeUsers}
            isError={isError}
          />

          <FeedbackMetrics
            totalFeedback={data?.totalFeedback ?? 0}
            totalEngagement={data?.totalEngagement ?? 0}
            isError={isError}
          />

          <StatusBreakdown projectId={projectId} />
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default ProjectOverview;

"use client";

import { Grid, GridItem, Stack } from "@omnidev/sigil";
import dayjs from "dayjs";

import {
  FeedbackMetrics,
  ProjectFeedback,
  ProjectInformation,
  StatusBreakdown,
} from "components/project";
import { useProjectMetricsQuery } from "generated/graphql";

import type { Project } from "generated/graphql";

interface Props {
  /** Project ID. */
  projectId: Project["rowId"];
}

const ProjectOverview = ({ projectId }: Props) => {
  // TODO: look into optimistic updates. Unnecessary for now, but would be nice for synchronous feedback with the details component. See: https://github.com/omnidotdev/backfeed-app/pull/58#issuecomment-2593070248 for more context.
  const { data, isLoading, isError } = useProjectMetricsQuery(
    {
      projectId,
    },
    {
      select: (data) => ({
        createdAt: dayjs(data?.project?.createdAt).format("M/D/YYYY"),
        activeUsers: Number(
          data?.project?.posts.aggregates?.distinctCount?.userId
        ),
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
            createdAt={data?.createdAt}
            activeUsers={data?.activeUsers}
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

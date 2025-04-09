"use client";

import { Grid, GridItem, Stack } from "@omnidev/sigil";
import { useSuspenseQuery } from "@tanstack/react-query";

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
  const { data, isError } = useSuspenseQuery(
    projectMetricsQueryOptions({
      projectId,
    })
  );

  return (
    <Grid columns={{ lg: 3 }} gap={6}>
      <GridItem colSpan={{ lg: 2 }}>
        <ProjectFeedback projectId={projectId} />
      </GridItem>

      <GridItem>
        <Stack gap={6}>
          <ProjectInformation
            createdAt={data.createdAt}
            activeUsers={data.activeUsers}
            isError={isError}
          />

          <FeedbackMetrics
            totalFeedback={data.totalFeedback}
            totalEngagement={data.totalEngagement}
            isError={isError}
          />

          <StatusBreakdown projectId={projectId} />
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default ProjectOverview;

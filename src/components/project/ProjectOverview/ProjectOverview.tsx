"use client";

import { Grid, GridItem, Stack } from "@omnidev/sigil";
import { useIsMutating } from "@tanstack/react-query";
import dayjs from "dayjs";

import {
  FeedbackMetrics,
  ProjectFeedback,
  ProjectInformation,
  StatusBreakdown,
} from "components/project";
import { useProjectMetricsQuery } from "generated/graphql";
import {
  CREATE_DOWNVOTE_MUTATION_KEY,
  CREATE_UPVOTE_MUTATION_KEY,
  DELETE_DOWNVOTE_MUTATION_KEY,
  DELETE_UPVOTE_MUTATION_KEY,
} from "lib/constants";

import type { Project } from "generated/graphql";

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

  const pendingUpvotes = useIsMutating({
    mutationKey: CREATE_UPVOTE_MUTATION_KEY,
  });
  const pendingDownvotes = useIsMutating({
    mutationKey: CREATE_DOWNVOTE_MUTATION_KEY,
  });
  const pendingDeleteUpvotes = useIsMutating({
    mutationKey: DELETE_UPVOTE_MUTATION_KEY,
  });
  const pendingDeleteDownvotes = useIsMutating({
    mutationKey: DELETE_DOWNVOTE_MUTATION_KEY,
  });

  const totalEngagement =
    (data?.totalEngagement ?? 0) +
    (pendingUpvotes + pendingDownvotes) -
    (pendingDeleteUpvotes + pendingDeleteDownvotes);

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
            totalEngagement={totalEngagement}
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

"use client";

import { Grid, GridItem, Stack } from "@omnidev/sigil";

import {
  FeedbackMetrics,
  ProjectFeedback,
  ProjectInformation,
  StatusBreakdown,
} from "components/project";

import type { Project } from "generated/graphql";

interface Props {
  /** Name of the project. */
  name: Project["name"];
  /** Description of the project. */
  description: Project["description"];
}

const ProjectOverview = ({ name, description }: Props) => (
  <Grid h="100%" columns={{ lg: 3 }} gap={6}>
    <GridItem h="100%" colSpan={{ lg: 2 }}>
      <ProjectFeedback />
    </GridItem>

    <GridItem h="100%">
      <Stack gap={6}>
        <ProjectInformation name={name!} description={description!} />

        <FeedbackMetrics />

        <StatusBreakdown />
      </Stack>
    </GridItem>
  </Grid>
);

export default ProjectOverview;

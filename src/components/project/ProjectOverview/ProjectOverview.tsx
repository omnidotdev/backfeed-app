"use client";

import { Grid, GridItem, Stack } from "@omnidev/sigil";

import {
  FeedbackMetrics,
  ProjectFeedback,
  ProjectInformation,
  StatusBreakdown,
} from "components/project";

import type { OrganizationProject } from "components/organization";

interface Props {
  /** Organization project data. */
  projectData: OrganizationProject;
}

const ProjectOverview = ({ projectData }: Props) => (
  <Grid h="100%" columns={{ lg: 3 }} gap={6}>
    <GridItem h="100%" colSpan={{ lg: 2 }}>
      <ProjectFeedback />
    </GridItem>

    <GridItem h="100%">
      <Stack gap={6}>
        <ProjectInformation
          projectName={projectData.name}
          projectDescription={projectData.description}
        />

        <FeedbackMetrics />

        <StatusBreakdown />
      </Stack>
    </GridItem>
  </Grid>
);

export default ProjectOverview;

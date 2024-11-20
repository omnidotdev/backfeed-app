"use client";

import { Grid, GridItem, Stack } from "@omnidev/sigil";
import { LuSettings } from "react-icons/lu";

import { PageHeader } from "components/layout";
import {
  FeedbackMetrics,
  ProjectFeedback,
  ProjectInformation,
  StatusBreakdown,
} from "components/project";
import { app } from "lib/config";

import type { OrganizationProject } from "components/organization";

const projectData: OrganizationProject = {
  id: "c924ed9c-a9c0-4510-8b18-fd0b10b69e1f",
  name: "Web Platform Beta",
  description: "Beta testing feedback for the new web platform",
  totalFeedback: 567,
  activeUsers: 890,
  lastUpdated: "2024-11-17T18:40:27.761Z",
};

/**
 * Project overview page.
 */
const ProjectPage = () => (
  <Stack maxW="8xl" mx="auto" p={6} gap={6}>
    <PageHeader
      // TODO: Dont use orgId here, use org name once query set up
      title={projectData.name}
      description={projectData.description}
      // TODO: add button actions
      cta={[
        {
          label: app.projectPage.header.cta.settings.label,
          icon: LuSettings,
        },
      ]}
    />

    <Grid h="100%" gap={6} columns={{ base: 1, md: 3 }}>
      <GridItem colSpan={{ base: 3, md: 2 }} h="100%">
        <ProjectFeedback />
      </GridItem>

      <GridItem h="100%">
        <Stack gap={6}>
          <ProjectInformation />

          <FeedbackMetrics />

          <StatusBreakdown />
        </Stack>
      </GridItem>
    </Grid>
  </Stack>
);

export default ProjectPage;

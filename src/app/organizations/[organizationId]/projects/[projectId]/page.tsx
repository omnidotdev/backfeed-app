"use client";

import { Button, Grid, GridItem, Icon, Stack } from "@omnidev/sigil";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { LuSettings } from "react-icons/lu";
import { HiOutlineFolder } from "react-icons/hi2";

import { Page } from "components/layout";
import {
  FeedbackMetrics,
  ProjectFeedback,
  ProjectInformation,
  StatusBreakdown,
} from "components/project";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

import type { OrganizationProject } from "components/organization";

const projectData: OrganizationProject = {
  id: "c924ed9c-a9c0-4510-8b18-fd0b10b69e1f",
  name: "Web Platform Beta",
  description: "Beta testing feedback for the new web platform",
};

/**
 * Project overview page.
 */
const ProjectPage = () => {
  const { isAuthenticated } = useAuth();

  const params = useParams<{ organizationId: string; projectId: string }>(),
    router = useRouter();

  const navigateToProjectsPage = () =>
    router.push(`/organizations/${params.organizationId}/projects`);

  if (!isAuthenticated) notFound();

  return (
    <Page
      // TODO: Use actual project data here instead of placeholder
      header={{
        title: projectData.name,
        description: projectData.description,
        // TODO: add button actions
        cta: [
          {
            label: app.projectPage.header.cta.settings.label,
            icon: LuSettings,
          },
          {
            label: app.projectPage.header.cta.viewAllProjects.label,
            icon: HiOutlineFolder,
            variant: "outline",
            onClick: navigateToProjectsPage,
          },
        ],
      }}
    >
      <Link href={`/${params.organizationId}`}>
        <Button
          variant="ghost"
          size="lg"
          _hover={{ bgColor: "background.muted" }}
        >
          <Icon src={FiArrowLeft} w={4} h={4} />
          {app.projectPage.backToOrganziation}
        </Button>
      </Link>

      <Grid h="100%" gap={6} columns={{ base: 1, md: 3 }}>
        <GridItem colSpan={{ base: 3, md: 2 }} h="100%">
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
    </Page>
  );
};

export default ProjectPage;

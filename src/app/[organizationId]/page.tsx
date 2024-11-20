"use client";

import { Grid, Stack } from "@omnidev/sigil";
import { useParams } from "next/navigation";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuPlusCircle } from "react-icons/lu";

import { PageHeader } from "components/layout";
import {
  OrganizationActions,
  OrganizationMetrics,
  OrganizationProjectsOverview,
} from "components/organization";
import { app } from "lib/config";
import { useDataState } from "lib/hooks";

/**
 * Organization overview page.
 */
const OrganizationPage = () => {
  const params = useParams<{ organizationId: string }>();

  const { isLoading, isError } = useDataState();

  return (
    <Stack maxW="8xl" mx="auto" p={6} gap={6}>
      <PageHeader
        // TODO: Dont use orgId here, use org name once query set up
        title={params.organizationId}
        description={app.organizationPage.header.description}
        // TODO: add button actions
        cta={[
          {
            label: app.organizationPage.header.cta.viewAllProjects.label,
            icon: HiOutlineFolder,
            variant: "outline",
          },
          {
            label: app.organizationPage.header.cta.newProject.label,
            icon: LuPlusCircle,
          },
        ]}
      />

      <OrganizationProjectsOverview />

      <Grid columns={{ base: 1, md: 2 }} gap={6}>
        {/* NB: these aggregates should be fine to fetch from the top level `organizationQuery` */}
        <OrganizationMetrics
          totalProjects={6}
          totalFeedback={420}
          activeUsers={1337}
          isLoaded={!isLoading}
          isError={isError}
        />

        <OrganizationActions />
      </Grid>
    </Stack>
  );
};

export default OrganizationPage;

"use client";

import { Grid } from "@omnidev/sigil";
import { notFound, useParams, useRouter } from "next/navigation";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuPlusCircle } from "react-icons/lu";

import { Page } from "components/layout";
import {
  OrganizationActions,
  OrganizationMetrics,
  OrganizationProjectsOverview,
} from "components/organization";
import { app } from "lib/config";
import { useAuth, useDataState } from "lib/hooks";

/**
 * Organization overview page.
 */
const OrganizationPage = () => {
  const { isAuthenticated } = useAuth();

  const params = useParams<{ organizationId: string }>(),
    router = useRouter();

  const { isLoading, isError } = useDataState();

  const navigateToProjectsPage = () =>
    router.push(`/organizations/${params.organizationId}/projects`);

  // TODO: when data is streamed in, this condition should be updated to check for the existence of the organization
  if (!isAuthenticated) notFound();

  return (
    <Page
      header={{
        title: params.organizationId,
        description: app.organizationPage.header.description,
        cta: [
          {
            label: app.organizationPage.header.cta.viewAllProjects.label,
            icon: <HiOutlineFolder />,
            variant: "outline",
            onClick: navigateToProjectsPage,
          },
          {
            label: app.organizationPage.header.cta.newProject.label,
            icon: <LuPlusCircle />,
          },
        ],
      }}
    >
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
    </Page>
  );
};

export default OrganizationPage;

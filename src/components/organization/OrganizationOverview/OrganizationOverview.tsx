"use client";

import { Grid } from "@omnidev/sigil";
import { useIsMutating } from "@tanstack/react-query";
import { HiOutlineFolder } from "react-icons/hi2";
import { LuCirclePlus } from "react-icons/lu";

import { Page } from "components/layout";
import {
  OrganizationActions,
  OrganizationMetrics,
  OrganizationProjectsOverview,
} from "components/organization";
import { useOrganizationMetricsQuery } from "generated/graphql";
import { app } from "lib/config";
import { CREATE_PROJECT_MUTATION_KEY } from "lib/constants";
import { useAuth } from "lib/hooks";
import { DialogType } from "store";

import type { Organization } from "generated/graphql";

interface Props {
  /** Organization details. */
  organization: Partial<Organization>;
}

const OrganizationOverview = ({ organization }: Props) => {
  const projectsBeingCreated = useIsMutating({
    mutationKey: CREATE_PROJECT_MUTATION_KEY,
  });

  const { isLoading: isAuthLoading } = useAuth();

  const {
    data: organizationMetrics,
    isLoading,
    isError,
  } = useOrganizationMetricsQuery(
    {
      organizationId: organization.rowId!,
    },
    {
      select: (data) => ({
        totalProjects: data?.projects?.totalCount,
        totalFeedback: data?.posts?.totalCount,
        activeUsers: data?.userOrganizations?.totalCount,
      }),
    }
  );

  const breadcrumbs = [
    {
      label: app.organizationsPage.breadcrumb,
      href: "/organizations",
    },
    {
      label: organization.name ?? organization.slug!,
    },
  ];

  return (
    <Page
      breadcrumbs={breadcrumbs}
      header={{
        title: organization.name!,
        description: app.organizationPage.header.description,
        cta: [
          {
            label: app.organizationPage.header.cta.viewAllProjects.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <HiOutlineFolder />,
            variant: "outline",
            href: `/organizations/${organization.slug}/projects`,
            disabled: !organization.projects?.nodes.length,
          },
          {
            label: app.organizationPage.header.cta.newProject.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <LuCirclePlus />,
            dialogType: DialogType.CreateProject,
            disabled: isAuthLoading,
          },
        ],
      }}
    >
      <OrganizationProjectsOverview organizationSlug={organization.slug!} />

      <Grid columns={{ base: 1, md: 2 }} gap={6}>
        {/* NB: these aggregates should be fine to fetch from the top level `organizationQuery` */}
        <OrganizationMetrics
          totalProjects={
            (organizationMetrics?.totalProjects ?? 0) + projectsBeingCreated
          }
          totalFeedback={organizationMetrics?.totalFeedback ?? 0}
          activeUsers={organizationMetrics?.activeUsers ?? 0}
          isLoaded={!isLoading}
          isError={isError}
        />

        <OrganizationActions organizationSlug={organization.slug!} />
      </Grid>
    </Page>
  );
};

export default OrganizationOverview;

"use client";

import { Grid } from "@omnidev/sigil";
import {
  OrganizationActions,
  OrganizationMetrics,
  OrganizationProjectsOverview,
} from "components/organization";
import { useOrganizationMetricsQuery } from "generated/graphql";

interface Props {
  /** Organization ID. */
  organizationId: string;
}

const OrganizationOverview = ({ organizationId }: Props) => {
  const {
    data: organizationMetrics,
    isLoading,
    isError,
  } = useOrganizationMetricsQuery(
    {
      organizationId,
    },
    {
      select: (data) => ({
        totalProjects: data?.projects?.totalCount,
        totalFeedback: data?.posts?.totalCount,
        activeUsers: data?.userOrganizations?.totalCount,
      }),
    }
  );

  return (
    <>
      <OrganizationProjectsOverview organizationId={organizationId} />

      <Grid columns={{ base: 1, md: 2 }} gap={6}>
        {/* NB: these aggregates should be fine to fetch from the top level `organizationQuery` */}
        <OrganizationMetrics
          totalProjects={organizationMetrics?.totalProjects ?? 0}
          totalFeedback={organizationMetrics?.totalFeedback ?? 0}
          activeUsers={organizationMetrics?.activeUsers ?? 0}
          isLoaded={!isLoading}
          isError={isError}
        />

        <OrganizationActions />
      </Grid>
    </>
  );
};

export default OrganizationOverview;

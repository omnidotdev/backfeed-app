"use client";

import { Grid } from "@omnidev/sigil";
import {
  OrganizationActions,
  OrganizationMetrics,
  OrganizationProjectsOverview,
} from "components/organization";
import { useDataState } from "lib/hooks";

const OrganizationOverview = () => {
  const { isLoading, isError } = useDataState();

  return (
    <>
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
    </>
  );
};

export default OrganizationOverview;

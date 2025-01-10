import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { DashboardPage } from "components/dashboard";
import { LandingPage } from "components/landing";
import { OrganizationOrderBy, useOrganizationsQuery } from "generated/graphql";
import { getAuthSession, getQueryClient } from "lib/util";

import type { OrganizationsQueryVariables } from "generated/graphql";

/**
 * Home page. This route is dynamically rendered based on the user's authentication status.
 */
const HomePage = async () => {
  const session = await getAuthSession();

  if (!session) return <LandingPage />;

  const queryClient = getQueryClient();

  const variables: OrganizationsQueryVariables = {
    pageSize: 3,
    offset: 0,
    orderBy: [OrganizationOrderBy.UserOrganizationsCountDesc],
    userId: session.user.rowId!,
  };

  await queryClient.prefetchQuery({
    queryKey: useOrganizationsQuery.getKey(variables),
    queryFn: useOrganizationsQuery.fetcher(variables),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardPage />
    </HydrationBoundary>
  );
};

export default HomePage;

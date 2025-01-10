import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import dayjs from "dayjs";

import { DashboardPage } from "components/dashboard";
import { LandingPage } from "components/landing";
import {
  OrganizationOrderBy,
  useDashboardAggregatesQuery,
  useOrganizationsQuery,
  useRecentFeedbackQuery,
  useWeeklyFeedbackQuery,
} from "generated/graphql";
import { getAuthSession, getQueryClient } from "lib/util";

import type { OrganizationsQueryVariables } from "generated/graphql";

const oneWeekAgo = dayjs().subtract(1, "week").startOf("day").toDate();

/**
 * Home page. This route is dynamically rendered based on the user's authentication status.
 */
const HomePage = async () => {
  const session = await getAuthSession();

  if (!session) return <LandingPage />;

  const queryClient = getQueryClient();

  const organizationsQueryVariables: OrganizationsQueryVariables = {
    pageSize: 3,
    offset: 0,
    orderBy: [OrganizationOrderBy.UserOrganizationsCountDesc],
    userId: session.user.rowId!,
  };

  await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: useOrganizationsQuery.getKey(organizationsQueryVariables),
      queryFn: useOrganizationsQuery.fetcher(organizationsQueryVariables),
    }),
    queryClient.prefetchQuery({
      queryKey: useDashboardAggregatesQuery.getKey({
        userId: session.user.id!,
      }),
      queryFn: useDashboardAggregatesQuery.fetcher({
        userId: session.user.id!,
      }),
    }),
    queryClient.prefetchQuery({
      queryKey: useWeeklyFeedbackQuery.getKey({
        userId: session.user.id!,
        startDate: oneWeekAgo,
      }),
      queryFn: useWeeklyFeedbackQuery.fetcher({
        userId: session.user.id!,
        startDate: oneWeekAgo,
      }),
    }),
    queryClient.prefetchQuery({
      queryKey: useRecentFeedbackQuery.getKey({ userId: session.user.id! }),
      queryFn: useRecentFeedbackQuery.fetcher({ userId: session.user.id! }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardPage />
    </HydrationBoundary>
  );
};

export default HomePage;

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import dayjs from "dayjs";

import { DashboardPage } from "components/dashboard";
import { LandingPage } from "components/landing";
import {
  OrganizationOrderBy,
  Role,
  useDashboardAggregatesQuery,
  useOrganizationsQuery,
  useRecentFeedbackQuery,
  useUserQuery,
  useWeeklyFeedbackQuery,
} from "generated/graphql";
import { getAuthSession, getQueryClient } from "lib/util";

import type { OrganizationsQueryVariables } from "generated/graphql";
import { hasTeamSubscription } from "lib/flags";

const oneWeekAgo = dayjs().subtract(1, "week").startOf("day").toDate();
const startOfToday = dayjs().startOf("day").toDate();

/**
 * Home page. This route is dynamically rendered based on the user's authentication status.
 */
const HomePage = async () => {
  const session = await getAuthSession();

  if (!session) return <LandingPage />;

  const isTeamTier = await hasTeamSubscription();

  const queryClient = getQueryClient();

  const organizationsQueryVariables: OrganizationsQueryVariables = {
    pageSize: 3,
    offset: 0,
    orderBy: [OrganizationOrderBy.MembersCountDesc],
    userId: session.user.rowId!,
    isMember: true,
  };

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: useOrganizationsQuery.getKey(organizationsQueryVariables),
      queryFn: useOrganizationsQuery.fetcher(organizationsQueryVariables),
    }),
    queryClient.prefetchQuery({
      queryKey: useOrganizationsQuery.getKey({
        userId: organizationsQueryVariables.userId,
        isMember: true,
        excludeRoles: [Role.Member],
      }),
      queryFn: useOrganizationsQuery.fetcher({
        userId: organizationsQueryVariables.userId,
        isMember: true,
        excludeRoles: [Role.Member],
      }),
    }),
    queryClient.prefetchQuery({
      queryKey: useDashboardAggregatesQuery.getKey({
        userId: session.user.rowId!,
      }),
      queryFn: useDashboardAggregatesQuery.fetcher({
        userId: session.user.rowId!,
      }),
    }),
    queryClient.prefetchQuery({
      queryKey: useWeeklyFeedbackQuery.getKey({
        userId: session.user.rowId!,
        startDate: oneWeekAgo,
        endDate: startOfToday,
      }),
      queryFn: useWeeklyFeedbackQuery.fetcher({
        userId: session.user.rowId!,
        startDate: oneWeekAgo,
        endDate: startOfToday,
      }),
    }),
    queryClient.prefetchQuery({
      queryKey: useRecentFeedbackQuery.getKey({ userId: session.user.rowId! }),
      queryFn: useRecentFeedbackQuery.fetcher({ userId: session.user.rowId! }),
    }),
    queryClient.prefetchQuery({
      queryKey: useUserQuery.getKey({ hidraId: session.user.hidraId! }),
      queryFn: useUserQuery.fetcher({ hidraId: session.user.hidraId! }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardPage isTeamTier={isTeamTier} />
    </HydrationBoundary>
  );
};

export default HomePage;

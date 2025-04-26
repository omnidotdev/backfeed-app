import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import dayjs from "dayjs";

import { auth } from "auth";
import { DashboardPage } from "components/dashboard";
import { LandingPage } from "components/landing";
import { CreateOrganization } from "components/organization";
import {
  OrganizationOrderBy,
  Role,
  useDashboardAggregatesQuery,
  useOrganizationsQuery,
  useRecentFeedbackQuery,
  useWeeklyFeedbackQuery,
} from "generated/graphql";
import {
  enableBasicTierPrivilegesFlag,
  enableTeamTierPrivilegesFlag,
} from "lib/flags";
import { getQueryClient } from "lib/util";

import type { OrganizationsQueryVariables } from "generated/graphql";

export const dynamic = "force-dynamic";

/**
 * Home page. This route is dynamically rendered based on the user's authentication status.
 */
const HomePage = async () => {
  const session = await auth();

  if (!session) return <LandingPage />;

  const [isBasicTier, isTeamTier] = await Promise.all([
    enableBasicTierPrivilegesFlag(),
    enableTeamTierPrivilegesFlag(),
  ]);

  const queryClient = getQueryClient();

  const organizationsQueryVariables: OrganizationsQueryVariables = {
    pageSize: 3,
    offset: 0,
    orderBy: [OrganizationOrderBy.MembersCountDesc],
    userId: session.user.rowId!,
    isMember: true,
  };

  const oneWeekAgo = dayjs().subtract(8, "days").startOf("day").toDate();
  const startOfToday = dayjs().startOf("day").toDate();

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
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardPage
        isBasicTier={isBasicTier}
        isTeamTier={isTeamTier}
        oneWeekAgo={oneWeekAgo}
        startOfToday={startOfToday}
      />

      {/* dialogs */}
      {isBasicTier && (
        <CreateOrganization isBasicTier={isBasicTier} isTeamTier={isTeamTier} />
      )}
    </HydrationBoundary>
  );
};

export default HomePage;

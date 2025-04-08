import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import dayjs from "dayjs";

import { auth } from "auth";
import { DashboardPage } from "components/dashboard";
import { LandingPage } from "components/landing";
import { OrganizationOrderBy, Role } from "generated/graphql";
import {
  dashboardAggregatesQueryOptions,
  organizationsQueryOptions,
  recentFeedbackQueryOptions,
  userQueryOptions,
  weeklyFeedbackQueryOptions,
} from "lib/react-query/options";
import { getQueryClient } from "lib/util";

import type { OrganizationsQueryVariables } from "generated/graphql";

const oneWeekAgo = dayjs().subtract(1, "week").startOf("day").toDate();
const startOfToday = dayjs().startOf("day").toDate();

export const dynamic = "force-dynamic";

/**
 * Home page. This route is dynamically rendered based on the user's authentication status.
 */
const HomePage = async () => {
  const session = await auth();

  if (!session) return <LandingPage />;

  const queryClient = getQueryClient();

  const organizationsQueryVariables: OrganizationsQueryVariables = {
    pageSize: 3,
    offset: 0,
    orderBy: [OrganizationOrderBy.MembersCountDesc],
    userId: session.user.rowId!,
    isMember: true,
  };

  queryClient.prefetchQuery(
    organizationsQueryOptions(organizationsQueryVariables)
  );
  queryClient.prefetchQuery(
    organizationsQueryOptions({
      userId: organizationsQueryVariables.userId,
      isMember: true,
      excludeRoles: [Role.Member],
    })
  );
  queryClient.prefetchQuery(
    dashboardAggregatesQueryOptions({ userId: session.user.rowId! })
  );
  queryClient.prefetchQuery(
    weeklyFeedbackQueryOptions({
      userId: session.user.rowId!,
      startDate: oneWeekAgo,
      endDate: startOfToday,
    })
  );
  queryClient.prefetchQuery(
    recentFeedbackQueryOptions({ userId: session.user.rowId! })
  );
  queryClient.prefetchQuery(
    userQueryOptions({ hidraId: session.user.hidraId! })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardPage
        hidraId={session.user.hidraId!}
        userId={session.user.rowId!}
      />
    </HydrationBoundary>
  );
};

export default HomePage;

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { auth } from "auth";
import { DashboardPage } from "components/dashboard";
import { LandingPage } from "components/landing";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  OrganizationOrderBy,
  Role,
  useDashboardAggregatesQuery,
  useInfiniteRecentFeedbackQuery,
  useOrganizationsQuery,
  useRecentFeedbackQuery,
  useUserQuery,
  useWeeklyFeedbackQuery,
} from "generated/graphql";
import { getQueryClient } from "lib/util";

import type { OrganizationsQueryVariables } from "generated/graphql";

dayjs.extend(utc);

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

  const oneWeekAgo = dayjs().utc().subtract(6, "days").startOf("day").toDate();

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
      queryKey: useOrganizationsQuery.getKey({
        pageSize: 1,
        userId: organizationsQueryVariables.userId,
        excludeRoles: [Role.Member, Role.Admin],
      }),
      queryFn: useOrganizationsQuery.fetcher({
        pageSize: 1,
        userId: organizationsQueryVariables.userId,
        excludeRoles: [Role.Member, Role.Admin],
      }),
    }),
    queryClient.prefetchQuery({
      queryKey: useUserQuery.getKey({ hidraId: session.user.hidraId! }),
      queryFn: useUserQuery.fetcher({ hidraId: session.user.hidraId! }),
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
      }),
      queryFn: useWeeklyFeedbackQuery.fetcher({
        userId: session.user.rowId!,
        startDate: oneWeekAgo,
      }),
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: useInfiniteRecentFeedbackQuery.getKey({
        userId: session.user.rowId!,
      }),
      queryFn: useRecentFeedbackQuery.fetcher({ userId: session.user.rowId! }),
      initialPageParam: undefined,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardPage user={session.user} oneWeekAgo={oneWeekAgo} />
    </HydrationBoundary>
  );
};

export default HomePage;

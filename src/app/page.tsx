import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { auth } from "auth";
import { DashboardPage } from "components/dashboard";
import { LandingPage } from "components/landing";
import { CreateOrganization } from "components/organization";
import {
  OrganizationOrderBy,
  Role,
  useDashboardAggregatesQuery,
  useInfiniteRecentFeedbackQuery,
  useOrganizationsQuery,
  useRecentFeedbackQuery,
  useWeeklyFeedbackQuery,
} from "generated/graphql";
import {
  enableFreeTierPrivilegesFlag,
  enableTeamTierPrivilegesFlag,
} from "lib/flags";
import { getQueryClient } from "lib/util";

import type { OrganizationsQueryVariables } from "generated/graphql";
import { getSdk } from "lib/graphql";

dayjs.extend(utc);

export const dynamic = "force-dynamic";

/**
 * Home page. This route is dynamically rendered based on the user's authentication status.
 */
const HomePage = async () => {
  const session = await auth();

  if (!session) return <LandingPage />;

  const sdk = getSdk({ session });

  const [{ organizations }, isFreeTier, isTeamTier] = await Promise.all([
    sdk.Organizations({
      pageSize: 1,
      userId: session.user.rowId,
      excludeRoles: [Role.Member, Role.Admin],
    }),
    enableFreeTierPrivilegesFlag(),
    enableTeamTierPrivilegesFlag(),
  ]);

  // NB: if the user is not subscribed to a team tier subscription or higher, limit the number of organizations they can create to just one.
  const canCreateOrganization =
    isTeamTier || (isFreeTier && !!organizations && !organizations?.totalCount);

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
      <DashboardPage
        user={session.user}
        canCreateOrganizations={canCreateOrganization}
        isSubscribed={isFreeTier}
        oneWeekAgo={oneWeekAgo}
      />

      {/* dialogs */}
      {canCreateOrganization && <CreateOrganization />}
    </HydrationBoundary>
  );
};

export default HomePage;

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { auth } from "auth";
import { DashboardPage } from "components/dashboard";
import { LandingPage } from "components/landing";
import { CreateOrganization } from "components/organization";
import { OrganizationOrderBy, Role } from "generated/graphql";
import {
  enableBasicTierPrivilegesFlag,
  enableTeamTierPrivilegesFlag,
} from "lib/flags";
import { Await } from "components/core";
import {
  dashboardAggregatesOptions,
  organizationsOptions,
  infiniteRecentFeedbackOptions,
  weeklyFeedbackOptions,
} from "lib/options";

import type { OrganizationsQueryVariables } from "generated/graphql";

dayjs.extend(utc);

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

  const organizationsQueryVariables: OrganizationsQueryVariables = {
    pageSize: 3,
    offset: 0,
    orderBy: [OrganizationOrderBy.MembersCountDesc],
    userId: session.user.rowId!,
    isMember: true,
  };

  const oneWeekAgo = dayjs().utc().subtract(6, "days").startOf("day").toDate();

  return (
    // TODO: separate concerns for prefetching for loading / error state management
    <Await
      prefetch={[
        organizationsOptions(organizationsQueryVariables),
        organizationsOptions({
          userId: organizationsQueryVariables.userId,
          isMember: true,
          excludeRoles: [Role.Member],
        }),
        dashboardAggregatesOptions({
          userId: session.user.rowId!,
        }),
        weeklyFeedbackOptions({
          userId: session.user.rowId!,
          startDate: oneWeekAgo,
        }),
      ]}
      infinitePrefetch={[
        infiniteRecentFeedbackOptions({ userId: session.user.rowId! }),
      ]}
    >
      <DashboardPage
        isBasicTier={isBasicTier}
        isTeamTier={isTeamTier}
        oneWeekAgo={oneWeekAgo}
      />

      {/* dialogs */}
      {isBasicTier && (
        <CreateOrganization isBasicTier={isBasicTier} isTeamTier={isTeamTier} />
      )}
    </Await>
  );
};

export default HomePage;

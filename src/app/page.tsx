import dayjs from "dayjs";

import { auth } from "auth";
import { DashboardPage } from "components/dashboard";
import { LandingPage } from "components/landing";
import { CreateOrganization } from "components/organization";
import { CreateProject } from "components/project";
import { OrganizationOrderBy, Role } from "generated/graphql";
import { hasBasicTierPrivileges, hasTeamTierPrivileges } from "lib/flags";

import { Await } from "components/core";
import {
  dashboardAggregatesOptions,
  organizationsOptions,
  recentFeedbackOptions,
  weeklyFeedbackOptions,
} from "lib/options";

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

  const [isBasicTier, isTeamTier] = await Promise.all([
    hasBasicTierPrivileges(),
    hasTeamTierPrivileges(),
  ]);

  const organizationsQueryVariables: OrganizationsQueryVariables = {
    pageSize: 3,
    offset: 0,
    orderBy: [OrganizationOrderBy.MembersCountDesc],
    userId: session.user.rowId!,
    isMember: true,
  };

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
          endDate: startOfToday,
        }),
        recentFeedbackOptions({ userId: session.user.rowId! }),
      ]}
    >
      <DashboardPage isBasicTier={isBasicTier} isTeamTier={isTeamTier} />

      {/* dialogs */}
      {isBasicTier && (
        <>
          <CreateOrganization
            isBasicTier={isBasicTier}
            isTeamTier={isTeamTier}
          />

          <CreateProject isBasicTier={isBasicTier} isTeamTier={isTeamTier} />
        </>
      )}
    </Await>
  );
};

export default HomePage;

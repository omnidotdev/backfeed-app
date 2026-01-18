import { Flex, Grid, Stack, Text } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import { LuCircleCheckBig, LuCircleDot, LuInbox } from "react-icons/lu";

import Aggregate from "@/components/dashboard/Aggregate";
import RecentFeedback from "@/components/dashboard/RecentFeedback";
import Page from "@/components/layout/Page";
import PinnedWorkspaces from "@/components/workspace/PinnedWorkspaces";
import app from "@/lib/config/app.config";
import {
  dashboardMetricsOptions,
  recentFeedbackOptions,
} from "@/lib/options/dashboard";
import createMetaTags from "@/lib/util/createMetaTags";

export const Route = createFileRoute("/_auth/dashboard")({
  beforeLoad: async ({ context: { session } }) => {
    if (!session?.user.rowId) return;

    // Get user's org IDs from JWT claims
    const organizationIds = session.organizations?.map((o) => o.id) ?? [];

    return { organizationIds };
  },
  loader: async ({ context }) => {
    const { session, queryClient } = context;
    // organizationIds comes from beforeLoad return value
    const organizationIds =
      (context as { organizationIds?: string[] }).organizationIds ??
      session?.organizations?.map((o) => o.id) ??
      [];

    const sevenDaysAgo = dayjs()
      .utc()
      .subtract(7, "days")
      .startOf("day")
      .toDate();

    await Promise.all([
      queryClient.ensureQueryData({
        ...dashboardMetricsOptions({
          organizationIds,
          sevenDaysAgo,
        }),
        revalidateIfStale: true,
      }),
      queryClient.ensureInfiniteQueryData({
        ...recentFeedbackOptions({
          organizationIds,
        }),
        revalidateIfStale: true,
      }),
    ]);

    return {
      sevenDaysAgo,
      organizationIds,
    };
  },
  head: () => ({ meta: createMetaTags({ title: "Dashboard" }) }),
  component: DashboardPage,
});

function DashboardPage() {
  const { sevenDaysAgo, organizationIds } = Route.useLoaderData();
  const { session } = Route.useRouteContext();

  const {
    data: metrics,
    isLoading,
    isError,
  } = useQuery({
    ...dashboardMetricsOptions({ organizationIds, sevenDaysAgo }),
    enabled: organizationIds.length > 0,
  });

  return (
    <Page
      header={{
        title: `${app.dashboardPage.welcomeMessage}, ${session?.user?.username}!`,
        description: app.dashboardPage.description,
      }}
    >
      <Stack gap={6}>
        {/* Metrics Row */}
        <Grid gap={4} columns={{ base: 1, sm: 3 }}>
          <Aggregate
            title="Needs Review"
            value={metrics?.needsReview?.totalCount ?? 0}
            icon={LuInbox}
            accentColor="amber"
            isLoaded={!isLoading}
            isError={isError}
          />

          <Aggregate
            title="Open"
            value={metrics?.openItems?.totalCount ?? 0}
            icon={LuCircleDot}
            accentColor="sky"
            isLoaded={!isLoading}
            isError={isError}
          />

          <Aggregate
            title="Resolved (7d)"
            value={metrics?.resolvedThisWeek?.totalCount ?? 0}
            icon={LuCircleCheckBig}
            accentColor="emerald"
            isLoaded={!isLoading}
            isError={isError}
          />
        </Grid>

        {/* Main Content Grid */}
        <Grid gap={6} columns={{ base: 1, lg: 2 }}>
          {/* Workspaces Section */}
          <Stack gap={4}>
            <Flex align="center" justify="space-between">
              <Text fontSize="sm" fontWeight="semibold">
                Your Workspaces
              </Text>
            </Flex>

            <PinnedWorkspaces />
          </Stack>

          {/* Needs Attention Section */}
          <RecentFeedback />
        </Grid>
      </Stack>
    </Page>
  );
}

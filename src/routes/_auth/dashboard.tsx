import { Grid, Icon } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import dayjs from "dayjs";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";
import { LuBuilding2, LuCirclePlus } from "react-icons/lu";

import Aggregate from "@/components/dashboard/Aggregate";
import FeedbackOverview from "@/components/dashboard/FeedbackOverview";
import RecentFeedback from "@/components/dashboard/RecentFeedback";
import Page from "@/components/layout/Page";
import CreateWorkspace from "@/components/workspace/CreateWorkspace";
import PinnedWorkspaces from "@/components/workspace/PinnedWorkspaces";
import { WorkspaceOrderBy } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import {
  dashboardAggregatesOptions,
  recentFeedbackOptions,
  weeklyFeedbackOptions,
} from "@/lib/options/dashboard";
import { workspacesOptions } from "@/lib/options/workspaces";
import { DialogType } from "@/lib/store/useDialogStore";
import createMetaTags from "@/lib/util/createMetaTags";

export const Route = createFileRoute("/_auth/dashboard")({
  beforeLoad: async ({ context: { queryClient, session } }) => {
    if (!session?.user.rowId) return;

    // Get user's org IDs for filtering workspaces
    const organizationIds = session.organizations?.map((o) => o.id) ?? [];

    // Check if user has no organizations (first-time user)
    const hasOrganizations = organizationIds.length > 0;

    if (!hasOrganizations) {
      // Double-check by querying workspaces directly
      const data = await queryClient.fetchQuery({
        ...workspacesOptions({ organizationIds }),
      });

      if (!data?.workspaces?.nodes?.length) {
        // Redirect to dashboard - onboarding is handled by Gatekeeper
        throw redirect({ to: "/dashboard" });
      }
    }

    return { organizationIds };
  },
  loader: async ({ context }) => {
    const { session, queryClient } = context;
    // organizationIds comes from beforeLoad return value
    const organizationIds =
      (context as { organizationIds?: string[] }).organizationIds ??
      session?.organizations?.map((o) => o.id) ??
      [];

    const oneWeekAgo = dayjs()
      .utc()
      .subtract(6, "days")
      .startOf("day")
      .toDate();

    await Promise.all([
      queryClient.ensureQueryData({
        ...workspacesOptions({
          pageSize: 3,
          offset: 0,
          orderBy: [WorkspaceOrderBy.UpdatedAtDesc],
          organizationIds,
        }),
        revalidateIfStale: true,
      }),
      queryClient.ensureQueryData({
        ...dashboardAggregatesOptions({
          organizationIds,
        }),
        revalidateIfStale: true,
      }),
      queryClient.ensureQueryData({
        ...weeklyFeedbackOptions({
          organizationIds,
          startDate: oneWeekAgo,
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
      oneWeekAgo: dayjs().utc().subtract(6, "days").startOf("day").toDate(),
      organizationIds,
    };
  },
  head: () => ({ meta: createMetaTags({ title: "Dashboard" }) }),
  component: DashboardPage,
});

function DashboardPage() {
  const { oneWeekAgo, organizationIds } = Route.useLoaderData();
  const { session } = Route.useRouteContext();

  const {
    data: dashboardAggregates,
    isLoading,
    isError,
  } = useQuery({
    ...dashboardAggregatesOptions({ organizationIds }),
    enabled: organizationIds.length > 0,
    select: (data) => ({
      totalFeedback: data?.posts?.totalCount ?? 0,
    }),
  });

  const aggregates = [
    {
      title: app.dashboardPage.aggregates.totalFeedback.title,
      value: dashboardAggregates?.totalFeedback ?? 0,
      icon: HiOutlineChatBubbleLeftRight,
    },
  ];

  return (
    <Page
      header={{
        title: `${app.dashboardPage.welcomeMessage}, ${session?.user?.username}!`,
        description: app.dashboardPage.description,
        cta: [
          {
            label: app.dashboardPage.cta.viewWorkspaces.label,
            variant: "outline",
            icon: <Icon src={LuBuilding2} />,
            linkOptions: { to: "/workspaces" },
          },
          {
            label: app.dashboardPage.cta.newWorkspace.label,
            icon: <Icon src={LuCirclePlus} />,
            dialogType: DialogType.CreateWorkspace,
          },
        ],
      }}
    >
      <PinnedWorkspaces />

      <Grid gap={6} alignItems="center" columns={{ base: 1, md: 2 }} w="100%">
        {aggregates.map(({ title, value, icon }) => (
          <Aggregate
            key={title}
            title={title}
            value={value}
            icon={icon}
            isLoaded={!isLoading}
            isError={isError}
          />
        ))}
      </Grid>

      <Grid h="100%" w="100%" gap={6} columns={{ base: 1, md: 2 }}>
        <FeedbackOverview oneWeekAgo={oneWeekAgo} />

        <RecentFeedback />
      </Grid>

      {/* dialogs */}
      <CreateWorkspace />
    </Page>
  );
}

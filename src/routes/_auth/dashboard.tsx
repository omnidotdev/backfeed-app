import { Grid, Icon } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import dayjs from "dayjs";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";
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

    // Check if user has no organizations (first-time user)
    const hasOrganizations = (session.organizations?.length ?? 0) > 0;

    if (!hasOrganizations) {
      // Double-check by querying workspaces directly
      const data = await queryClient.fetchQuery({
        ...workspacesOptions({
          userId: session.user.rowId,
          isMember: true,
        }),
      });

      if (!data?.workspaces?.nodes?.length) {
        // Redirect to onboarding for first-time users
        throw redirect({ to: "/onboarding" });
      }
    }
  },
  loader: async ({ context: { session, queryClient } }) => {
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
          orderBy: [WorkspaceOrderBy.MembersCountDesc],
          userId: session?.user.rowId!,
          isMember: true,
        }),
        revalidateIfStale: true,
      }),
      queryClient.ensureQueryData({
        ...dashboardAggregatesOptions({
          userId: session?.user.rowId!,
        }),
        revalidateIfStale: true,
      }),
      queryClient.ensureQueryData({
        ...weeklyFeedbackOptions({
          userId: session?.user?.rowId!,
          startDate: oneWeekAgo,
        }),
        revalidateIfStale: true,
      }),
      queryClient.ensureInfiniteQueryData({
        ...recentFeedbackOptions({
          userId: session?.user?.rowId!,
        }),
        revalidateIfStale: true,
      }),
    ]);

    return {
      oneWeekAgo: dayjs().utc().subtract(6, "days").startOf("day").toDate(),
    };
  },
  head: () => ({ meta: createMetaTags({ title: "Dashboard" }) }),
  component: DashboardPage,
});

function DashboardPage() {
  const { oneWeekAgo } = Route.useLoaderData();
  const { session } = Route.useRouteContext();

  const {
    data: dashboardAggregates,
    isLoading,
    isError,
  } = useQuery({
    ...dashboardAggregatesOptions({ userId: session?.user.rowId! }),
    enabled: !!session?.user?.rowId,
    select: (data) => ({
      totalFeedback: data?.posts?.totalCount,
      totalUsers: data?.users?.totalCount,
    }),
  });

  const aggregates = [
    {
      title: app.dashboardPage.aggregates.totalFeedback.title,
      value: dashboardAggregates?.totalFeedback ?? 0,
      icon: HiOutlineChatBubbleLeftRight,
    },
    {
      title: app.dashboardPage.aggregates.activeUsers.title,
      value: dashboardAggregates?.totalUsers ?? 0,
      icon: HiOutlineUserGroup,
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

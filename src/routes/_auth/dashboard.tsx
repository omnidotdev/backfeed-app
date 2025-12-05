import { Grid, Icon } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
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
import CreateOrganization from "@/components/organization/CreateOrganization";
import PinnedOrganizations from "@/components/organization/PinnedOrganizations";
import { OrganizationOrderBy } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import {
  dashboardAggregatesOptions,
  recentFeedbackOptions,
  weeklyFeedbackOptions,
} from "@/lib/options/dashboard";
import { organizationsOptions } from "@/lib/options/organizations";
import { DialogType } from "@/lib/store/useDialogStore";

import type { OrganizationsQueryVariables } from "@/generated/graphql";

export const Route = createFileRoute("/_auth/dashboard")({
  loader: async ({ context: { session, queryClient } }) => {
    const organizationsQueryVariables: OrganizationsQueryVariables = {
      pageSize: 3,
      offset: 0,
      orderBy: [OrganizationOrderBy.MembersCountDesc],
      userId: session?.user.rowId!,
      isMember: true,
    };

    const oneWeekAgo = dayjs()
      .utc()
      .subtract(6, "days")
      .startOf("day")
      .toDate();

    await Promise.all([
      queryClient.ensureQueryData(
        organizationsOptions(organizationsQueryVariables),
      ),
      queryClient.ensureQueryData(
        dashboardAggregatesOptions({
          userId: session?.user.rowId!,
        }),
      ),
      queryClient.ensureQueryData(
        weeklyFeedbackOptions({
          userId: session?.user?.rowId!,
          startDate: oneWeekAgo,
        }),
      ),
      queryClient.ensureInfiniteQueryData(
        recentFeedbackOptions({
          userId: session?.user?.rowId!,
        }),
      ),
    ]);

    return {
      oneWeekAgo: dayjs().utc().subtract(6, "days").startOf("day").toDate(),
    };
  },
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
            label: app.dashboardPage.cta.viewOrganizations.label,
            variant: "outline",
            icon: <Icon src={LuBuilding2} />,
            href: "/organizations",
          },
          {
            label: app.dashboardPage.cta.newOrganization.label,
            icon: <Icon src={LuCirclePlus} />,
            dialogType: DialogType.CreateOrganization,
          },
        ],
      }}
    >
      <PinnedOrganizations />

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
      <CreateOrganization />
    </Page>
  );
}

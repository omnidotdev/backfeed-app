"use client";

import { Grid, Icon } from "@omnidev/sigil";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { LuBuilding2, LuCirclePlus } from "react-icons/lu";

import {
  Aggregate,
  FeedbackOverview,
  PinnedOrganizations,
  RecentFeedback,
} from "components/dashboard";
import { Page } from "components/layout";
import { CreateOrganization } from "components/organization";
import { useDashboardAggregatesQuery } from "generated/graphql";
import { app } from "lib/config";
import { DialogType } from "store";

import type { Session } from "next-auth";

interface Props {
  /** Authenticated user. */
  user: Session["user"];
  /** Start of day from one week ago. */
  oneWeekAgo: Date;
}

/**
 * Dashboard page. This provides the main layout for the home page when the user is authenticated.
 */
const DashboardPage = ({ user, oneWeekAgo }: Props) => {
  const {
    data: dashboardAggregates,
    isLoading,
    isError,
  } = useDashboardAggregatesQuery(
    {
      userId: user?.rowId!,
    },
    {
      enabled: !!user?.rowId,
      select: (data) => ({
        totalFeedback: data?.posts?.totalCount,
        totalUsers: data?.users?.totalCount,
      }),
    },
  );

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
        title: `${app.dashboardPage.welcomeMessage}, ${user?.username}!`,
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
      <PinnedOrganizations user={user} />

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
        <FeedbackOverview user={user} oneWeekAgo={oneWeekAgo} />

        <RecentFeedback user={user} />
      </Grid>

      {/* dialogs */}
      <CreateOrganization />
    </Page>
  );
};

export default DashboardPage;

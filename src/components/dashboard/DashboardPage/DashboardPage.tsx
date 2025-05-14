"use client";

import { Grid } from "@omnidev/sigil";
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
import { useDashboardAggregatesQuery } from "generated/graphql";
import { app } from "lib/config";
import { DialogType } from "store";

import type { Session } from "next-auth";

interface Props {
  /** Authenticated user. */
  user: Session["user"];
  /** Whether the authenticated user can create organizations. */
  canCreateOrganizations: boolean;
  /** Whether the authenticated user is subscribed. */
  isSubscribed: boolean;
  /** Start of day from one week ago. */
  oneWeekAgo: Date;
}

/**
 * Dashboard page. This provides the main layout for the home page when the user is authenticated.
 */
const DashboardPage = ({
  user,
  canCreateOrganizations,
  isSubscribed,
  oneWeekAgo,
}: Props) => {
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
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <LuBuilding2 />,
            href: "/organizations",
          },
          {
            label: app.dashboardPage.cta.newOrganization.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <LuCirclePlus />,
            dialogType: DialogType.CreateOrganization,
            disabled: !canCreateOrganizations,
            tooltip: isSubscribed
              ? app.dashboardPage.cta.newOrganization.subscribedTooltip
              : app.dashboardPage.cta.newOrganization.noSubscriptionTooltip,
          },
        ],
      }}
    >
      <PinnedOrganizations
        user={user}
        canCreateOrganizations={canCreateOrganizations}
        isSubscribed={isSubscribed}
      />

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
    </Page>
  );
};

export default DashboardPage;

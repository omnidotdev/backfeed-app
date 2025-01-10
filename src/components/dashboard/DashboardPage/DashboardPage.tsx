"use client";

import { Grid } from "@omnidev/sigil";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { LuPlusCircle } from "react-icons/lu";

import { Aggregate, Feedback, PinnedOrganizations } from "components/dashboard";
import { Page } from "components/layout";
import {
  useDashboardAggregatesQuery,
  useOrganizationsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { DialogType, useAuth, useDialogStore } from "lib/hooks";

/**
 * Dashboard page. This provides the main layout for the home page when the user is authenticated.
 */
const DashboardPage = () => {
  const { user } = useAuth();

  const { setIsOpen: setIsCreateProjectDialogOpen } = useDialogStore({
    type: DialogType.CreateProject,
  });

  const {
    data: dashboardAggregates,
    isLoading,
    isError,
  } = useDashboardAggregatesQuery(
    {
      userId: user?.id!,
    },
    {
      enabled: !!user?.id,
      select: (data) => ({
        totalFeedback: data?.posts?.totalCount,
        totalUsers: data?.users?.totalCount,
      }),
    }
  );

  const { data: numberOfOrganizations } = useOrganizationsQuery(
    {
      userId: user?.rowId!,
    },
    {
      enabled: !!user?.rowId,
      select: (data) => data?.organizations?.totalCount,
    }
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
        title: `${app.dashboardPage.welcomeMessage}, ${user?.firstName}!`,
        description: app.dashboardPage.description,
        cta: [
          {
            label: app.dashboardPage.cta.newProject.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <LuPlusCircle />,
            onClick: () => setIsCreateProjectDialogOpen(true),
            disabled: !numberOfOrganizations,
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

      <Feedback />
    </Page>
  );
};

export default DashboardPage;

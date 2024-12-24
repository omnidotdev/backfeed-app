"use client";

import { Grid } from "@omnidev/sigil";
import { GoClock } from "react-icons/go";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { LuPlusCircle } from "react-icons/lu";

import { Aggregate, Feedback, PinnedOrganizations } from "components/dashboard";
import { Page } from "components/layout";
import { app } from "lib/config";
import { useAuth, useDataState } from "lib/hooks";

/**
 * Dashboard page. This provides the main layout for the home page when the user is authenticated.
 */
const DashboardPage = () => {
  const { user } = useAuth(),
    { isLoading, isError } = useDataState({ timeout: 400 });

  const aggregates = [
    {
      title: app.dashboardPage.aggregates.totalFeedback.title,
      value: "12,345",
      icon: HiOutlineChatBubbleLeftRight,
    },
    {
      title: app.dashboardPage.aggregates.activeUsers.title,
      value: "42,069",
      icon: HiOutlineUserGroup,
    },
    {
      title: app.dashboardPage.aggregates.avgResponseTime.title,
      value: "4.20h",
      icon: GoClock,
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
            icon: LuPlusCircle,
          },
        ],
      }}
    >
      <PinnedOrganizations />

      <Grid gap={6} alignItems="center" columns={{ base: 1, md: 3 }} w="100%">
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

"use client";

import { Grid } from "@omnidev/sigil";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { LuCirclePlus } from "react-icons/lu";

import { Aggregate, Feedback, PinnedOrganizations } from "components/dashboard";
import { Page } from "components/layout";
import {
  Role,
  useDashboardAggregatesQuery,
  useOrganizationsQuery,
  useUserQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";
import { DialogType } from "store";

interface Props {
  /** Whether the user has basic tier subscription permissions. */
  isBasicTier: boolean;
  /** Whether the user has team tier subscription permissions. */
  isTeamTier: boolean;
}

/**
 * Dashboard page. This provides the main layout for the home page when the user is authenticated.
 */
const DashboardPage = ({ isBasicTier, isTeamTier }: Props) => {
  const { user, isLoading: isAuthLoading } = useAuth();

  const { data: firstName } = useUserQuery(
    {
      hidraId: user?.hidraId!,
    },
    {
      enabled: !!user?.hidraId,
      select: (data) => data?.userByHidraId?.firstName,
    },
  );

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

  const { data: numberOfOrganizations } = useOrganizationsQuery(
    {
      userId: user?.rowId!,
      isMember: true,
      excludeRoles: [Role.Member],
    },
    {
      enabled: !!user?.rowId,
      select: (data) => data?.organizations?.totalCount,
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

  if (isAuthLoading) return null;

  return (
    <Page
      header={{
        title: `${app.dashboardPage.welcomeMessage}, ${firstName}!`,
        description: app.dashboardPage.description,
        cta: [
          {
            label: app.dashboardPage.cta.newOrganization.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <LuCirclePlus />,
            dialogType: DialogType.CreateOrganization,
            variant: "outline",
            disabled: !isBasicTier || (!isTeamTier && !!numberOfOrganizations),
          },
          {
            label: app.dashboardPage.cta.newProject.label,
            // TODO: get Sigil Icon component working and update accordingly. Context: https://github.com/omnidotdev/backfeed-app/pull/44#discussion_r1897974331
            icon: <LuCirclePlus />,
            dialogType: DialogType.CreateProject,
            disabled: !isBasicTier || !numberOfOrganizations,
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

import { Flex, Grid } from "@omnidev/sigil";
import { GoClock } from "react-icons/go";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { LuPlusCircle } from "react-icons/lu";

import { app } from "lib/config";
import { useAuth, useDataState } from "lib/hooks";
import { Aggregate, Feedback, Organizations } from "components/dashboard";
import { PageHeader } from "components/core";

/**
 * Dashboard page. This provides the main layout for the home page when the user is authenticated.
 */
const DashboardPage = () => {
  const { firstName } = useAuth(),
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
    <Flex
      direction="column"
      align="center"
      w="100%"
      h="100%"
      maxW="8xl"
      mx="auto"
      px={4}
      py={5}
      gap={6}
    >
      <PageHeader
        title={firstName}
        description={app.dashboardPage.description}
        greeting={app.dashboardPage.welcomeMessage}
        // TODO: add button actions
        cta={[
          {
            label: app.dashboardPage.cta.newProject.label,
            icon: LuPlusCircle,
          },
        ]}
      />

      <Organizations />

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
    </Flex>
  );
};

export default DashboardPage;

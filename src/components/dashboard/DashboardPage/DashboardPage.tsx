import { Button, Flex, Grid, Icon, Text } from "@omnidev/sigil";
import { FiPlusCircle } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { Aggregate, Feedback, Organizations } from "components/dashboard";
import { app } from "lib/config";
import { useAuth, useDataState } from "lib/hooks";

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
      <Flex direction="column" w="100%">
        <Flex
          direction={{ base: "column", sm: "row" }}
          align={{ base: "flex-start", sm: "center" }}
          justify="space-between"
          gap={4}
        >
          <Flex direction="column">
            <Text
              as="h1"
              fontSize="3xl"
              fontWeight="semibold"
              lineHeight={1.3}
            >{`${app.dashboardPage.welcomeMessage}, ${firstName}!`}</Text>

            <Text
              as="h2"
              fontSize={{ base: "sm", sm: "md" }}
              fontWeight="medium"
              color="foreground.subtle"
            >
              {app.dashboardPage.description}
            </Text>
          </Flex>

          <Button width={{ base: "full", sm: "auto" }}>
            <Icon src={FiPlusCircle} w={4} h={4} />

            <Text>New Project</Text>
          </Button>
        </Flex>
      </Flex>

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

import { Button, Flex, Icon, Text } from "@omnidev/sigil";
import { FiPlusCircle } from "react-icons/fi";

import { Organizations } from "components/dashboard";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

const DashboardPage = () => {
  const { firstName } = useAuth();
  return (
    <Flex
      direction="column"
      align="center"
      w="100%"
      h="100%"
      py={5}
      px={12}
      gap={6}
    >
      <Flex direction="column" w="100%">
        <Flex align="center" justify="space-between">
          <Flex direction="column">
            <Text
              as="h1"
              fontSize="3xl"
              fontWeight="semibold"
              lineHeight={1.3}
            >{`${app.dashboardPage.welcomeMessage}, ${firstName}!`}</Text>
            <Text as="h2" fontWeight="medium" color="foreground.subtle">
              {app.dashboardPage.description}
            </Text>
          </Flex>
          <Button>
            <Icon src={FiPlusCircle} w={4} h={4} />
            New Project
          </Button>
        </Flex>
      </Flex>
      <Organizations />
    </Flex>
  );
};

export default DashboardPage;

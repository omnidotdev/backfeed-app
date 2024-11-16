import { Button, Flex, Grid, Icon, Text } from "@omnidev/sigil";
import { FiMoreHorizontal, FiPlusCircle } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";

import { OrganizationCard } from "components/dashboard";
import { app } from "lib/config";

const Organizations = () => (
  <Flex
    direction="column"
    bgColor="background.default"
    w="100%"
    borderRadius="lg"
    boxShadow="lg"
    borderColor="border.subtle"
    p={6}
    gap={6}
  >
    <Flex justify="space-between">
      <Flex direction="column">
        <Flex align="center" gap={2}>
          <Icon src={LuBuilding2} w={5} h={5} color="foreground.subtle" />

          <Text fontSize="2xl" fontWeight="semibold" lineHeight={1.2}>
            {app.dashboardPage.organizations.title}
          </Text>
        </Flex>

        <Text color="foreground.subtle" fontSize="sm">
          {app.dashboardPage.organizations.description}
        </Text>
      </Flex>

      <Button>
        <Icon src={FiPlusCircle} w={4} h={4} />
        New Organization
      </Button>
    </Flex>

    <Grid gap={6} alignItems="center" columns={{ base: 1, md: 2, xl: 3 }}>
      <OrganizationCard />

      <OrganizationCard />

      <OrganizationCard />
    </Grid>

    <Button
      variant="icon"
      w="fit-content"
      bgColor="transparent"
      opacity={{ base: 1, _hover: 0.8 }}
      placeSelf="center"
      my={-4}
    >
      <Icon
        src={FiMoreHorizontal}
        w={8}
        h={8}
        color="foreground.subtle"
        placeSelf="center"
      />
    </Button>
  </Flex>
);

export default Organizations;

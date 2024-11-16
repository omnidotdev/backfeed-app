import { Button, Flex, Grid, Icon, Text } from "@omnidev/sigil";
import { FiArrowUpRight } from "react-icons/fi";

import {
  OrganizationMembers,
  OrganizationProjects,
} from "components/dashboard";

const OrganizationCard = () => {
  return (
    <Flex
      position="relative"
      direction="column"
      borderColor="border.subtle"
      borderRadius="lg"
      borderWidth="1px"
      px={6}
      py={7}
    >
      <Button
        position="absolute"
        top={1}
        right={1}
        zIndex="sticky"
        p={2}
        variant="icon"
        color={{ base: "foreground.muted", _hover: "brand.primary" }}
        bgColor="transparent"
      >
        <Icon src={FiArrowUpRight} w={5} h={5} />
      </Button>
      <Flex direction="column">
        <Text fontSize="lg" fontWeight="semibold" lineHeight={1.2}>
          Organization Name
        </Text>
        <Text fontSize="sm" color="foreground.subtle">
          Company Type
        </Text>
      </Flex>
      <Grid columns={2} mt={6} alignItems="start">
        <OrganizationMembers />
        <OrganizationProjects />
      </Grid>
    </Flex>
  );
};

export default OrganizationCard;

import { Flex, Icon, Text } from "@omnidev/sigil";
import { HiOutlineFolder } from "react-icons/hi2";

const OrganizationProjects = () => (
  <Flex direction="column" gap={4}>
    <Flex align="center" gap={2}>
      <Icon src={HiOutlineFolder} w={5} h={5} color="foreground.subtle" />

      <Flex color="foreground.subtle" fontSize="sm" gap={1}>
        <Text>69</Text>

        <Text display={{ base: "none", xl: "inline" }}>Projects</Text>
      </Flex>
    </Flex>
  </Flex>
);

export default OrganizationProjects;

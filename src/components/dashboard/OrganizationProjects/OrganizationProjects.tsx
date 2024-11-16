import { Flex, Icon, Text } from "@omnidev/sigil";
import { HiOutlineFolder } from "react-icons/hi2";

const OrganizationProjects = () => (
  <Flex direction="column" gap={4}>
    <Flex align="center" gap={2}>
      <Icon src={HiOutlineFolder} w={5} h={5} color="foreground.subtle" />

      <Text color="foreground.subtle" fontSize="sm">
        69 Projects
      </Text>
    </Flex>
  </Flex>
);

export default OrganizationProjects;

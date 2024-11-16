import { Flex, Icon, Text } from "@omnidev/sigil";
import { HiOutlineUserGroup } from "react-icons/hi2";

const OrganizationMembers = () => (
  <Flex direction="column" gap={4}>
    <Flex align="center" gap={2}>
      <Icon src={HiOutlineUserGroup} w={5} h={5} color="foreground.subtle" />

      <Flex color="foreground.subtle" fontSize="sm" gap={1}>
        <Text>420</Text>

        <Text display={{ base: "none", xl: "inline" }}>Members</Text>
      </Flex>
    </Flex>
  </Flex>
);

export default OrganizationMembers;

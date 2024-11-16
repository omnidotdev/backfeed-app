import { Button, Flex, Icon, Text } from "@omnidev/sigil";
import { FiPlusCircle } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";

const Organizations = () => {
  return (
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
              Organizations
            </Text>
          </Flex>

          <Text color="foreground.subtle" fontSize="sm">
            Manage your organizations and their feedback projects
          </Text>
        </Flex>

        <Button>
          <Icon src={FiPlusCircle} w={4} h={4} />
          New Organization
        </Button>
      </Flex>
      <Flex>Org Cards</Flex>
    </Flex>
  );
};

export default Organizations;

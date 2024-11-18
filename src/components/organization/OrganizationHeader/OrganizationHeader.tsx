import { Button, Flex, Icon, Stack, Text } from "@omnidev/sigil";
import { app } from "lib/config";
import { LuPlusCircle } from "react-icons/lu";

interface Props {
  organizationName: string;
}

const OrganizationName = ({ organizationName }: Props) => (
  <Flex
    flexDirection={{ base: "column", md: "row" }}
    alignItems="center"
    justifyContent="space-between"
    gap={6}
  >
    <Stack>
      <Text as="h1" fontSize="3xl" fontWeight="bold">
        {organizationName}
      </Text>
      <Text color="foreground.muted">
        {app.organizationPage.header.description}
      </Text>
    </Stack>

    <Flex gap={4}>
      <Button variant="outline" size="sm">
        View All Projects
      </Button>
      <Button colorScheme="primary" size="sm">
        <Icon src={LuPlusCircle} w={4} h={4} />
        New Project
      </Button>
    </Flex>
  </Flex>
);

export default OrganizationName;

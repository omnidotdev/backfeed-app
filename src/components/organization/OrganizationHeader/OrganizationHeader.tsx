import { Flex, Stack, Text, Button, Icon } from "@omnidev/sigil";
import { app } from "lib/config";
import { LuPlusCircle } from "react-icons/lu";

interface Props {
  orgId: string;
}

const OrganizationHeader = ({ orgId }: Props) => {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Stack>
        {/* TODO: Dont use slug here, use org name once query set up */}
        <Text as="h1" fontSize="3xl" fontWeight="bold" mb={1}>
          {orgId}
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
};

export default OrganizationHeader;

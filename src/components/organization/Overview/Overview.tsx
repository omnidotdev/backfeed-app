import { Button, Flex, Grid, Text, Stack, Icon } from "@omnidev/sigil";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { HiOutlineFolder } from "react-icons/hi2";
import { Project } from "components/organization";
import { app } from "lib/config";
import { useDataState } from "lib/hooks";

import type { OrgProject } from "app/[organizationId]/page";

dayjs.extend(relativeTime);

interface Props {
  projects: OrgProject[];
}

const Overview = ({ projects }: Props) => {
  const { isLoading, isError } = useDataState();

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
        <Stack>
          <Flex align="center" gap={2}>
            <Icon src={HiOutlineFolder} w={5} h={5} color="foreground.subtle" />

            <Text fontSize="2xl" fontWeight="semibold" lineHeight={1.2}>
              {app.organizationPage.projects.title}
            </Text>
          </Flex>

          <Text color="foreground.subtle" fontSize="sm">
            {app.organizationPage.projects.description}
          </Text>
        </Stack>

        <Button
          variant={{ base: "ghost", md: "outline" }}
          ml={4}
          color="brand.primary"
          borderColor="brand.primary"
        >
          <Text display={{ base: "none", md: "inline" }}>
            View All Projects
          </Text>
        </Button>
      </Flex>

      <Grid
        height="400px"
        overflowY="scroll"
        // NB: The pr is padding is necessary to provide space for the scrollbar
        pr={5}
        // NB: The 1px padding is necessary to prevet clipping of the card borders / box shadows.
        p="1px"
        gap={6}
      >
        {projects.map(
          ({
            id,
            name,
            description,
            totalFeedback,
            activeUsers,
            lastUpdated,
          }) => (
            <Project
              key={id}
              name={name}
              description={description}
              totalFeedback={totalFeedback}
              activeUsers={activeUsers}
              lastUpdated={lastUpdated}
              isLoaded={!isLoading}
              isError={isError}
            />
          )
        )}
      </Grid>
    </Flex>
  );
};

export default Overview;

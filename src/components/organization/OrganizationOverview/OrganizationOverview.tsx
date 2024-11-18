import { Button, Flex, Grid, Icon, Stack, Text } from "@omnidev/sigil";
import { Project } from "components/organization";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { app } from "lib/config";
import { useDataState } from "lib/hooks";
import { HiOutlineFolder } from "react-icons/hi2";

dayjs.extend(relativeTime);

interface OrganizationProject {
  /** Organization ID. */
  id: string;
  /** Organization name. */
  name: string;
  /** Organization description. */
  description: string;
  /** Quantity of total feedback. */
  totalFeedback: number;
  /** Quantity of active users. */
  activeUsers: number;
  /** Timestamp when the organization was last updated. */
  lastUpdated: string;
}

export const projects: OrganizationProject[] = [
  {
    id: "1",
    name: "Mobile App Feedback",
    description:
      "Collecting user feedback for our iOS and Android applications. Collecting user feedback for our iOS and Android applications.",
    totalFeedback: 234,
    activeUsers: 1200,
    lastUpdated: "2024-11-05T18:40:27.761Z",
  },
  {
    id: "2",
    name: "Web Platform Beta",
    description: "Beta testing feedback for the new web platform",
    totalFeedback: 567,
    activeUsers: 890,
    lastUpdated: "2024-11-17T18:40:27.761Z",
  },
  {
    id: "3",
    name: "Desktop Client",
    description: "User experience feedback for desktop applications",
    totalFeedback: 123,
    activeUsers: 450,
    lastUpdated: "2024-11-12T18:40:27.761Z",
  },
];

/**
 * Organization overview.
 */
const OrganizationOverview = () => {
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
        overflow="auto"
        // NB: The pr padding is necessary to provide space for the scrollbar
        pr={5}
        // NB: The 1px padding is necessary to prevet clipping of the card borders / box shadows.
        p="1px"
        gap={6}
        columns={{ base: 1, md: 2 }}
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

export default OrganizationOverview;

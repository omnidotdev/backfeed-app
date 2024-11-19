import { Flex, Skeleton, Stack, Text } from "@omnidev/sigil";
import { app } from "lib/config";

interface Props {
  /** The total amount of organization projects */
  totalProjects: number;
  /** The total amount of feedback across all projects */
  totalFeedback: number;
  /** The total amount of active users across all projects */
  activeUsers: number;
  /** Whether the organization data is loaded. */
  isLoaded?: boolean;
  /** Whether loading the organization data encountered an error. */
  isError?: boolean;
}

interface Statistic {
  title: string;
  value: number;
}

const OrganizationStats = ({
  totalProjects,
  totalFeedback,
  activeUsers,
  isLoaded,
  isError,
}: Props) => {
  const STATISTICS: Statistic[] = [
    {
      title: app.organizationPage.stats.data.totalProjects.title,
      value: totalProjects,
    },
    {
      title: app.organizationPage.stats.data.totalFeedback.title,
      value: totalFeedback,
    },
    {
      title: app.organizationPage.stats.data.activeUsers.title,
      value: activeUsers,
    },
  ];

  return (
    <Stack
      bgColor="background.default"
      borderRadius="lg"
      boxShadow="lg"
      borderColor="border.subtle"
      p={6}
      gap={6}
    >
      <Stack>
        <Text fontSize="2xl" fontWeight="semibold" lineHeight={1.2}>
          {app.organizationPage.stats.title}
        </Text>

        <Text color="foreground.subtle" fontSize="sm">
          {app.organizationPage.stats.description}
        </Text>
      </Stack>

      <Stack gap={4}>
        {STATISTICS.map(({ title, value }) => (
          <Flex key={title} justifyContent="space-between">
            <Text color="foreground.muted">{title}</Text>
            <Skeleton isLoaded={isLoaded} minW={8}>
              <Text textAlign="right">{isError ? 0 : value}</Text>
            </Skeleton>
          </Flex>
        ))}
      </Stack>
    </Stack>
  );
};

export default OrganizationStats;

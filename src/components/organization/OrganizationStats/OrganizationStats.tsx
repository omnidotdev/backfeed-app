import { Card, Stack, Flex, Text } from "@omnidev/sigil";
import { app } from "lib/config";

import type { Project } from "app/[organization]/page";

interface Props {
  projects: Project[];
}

const OrganizationStats = ({ projects }: Props) => {
  return (
    <Card
      title={app.organizationPage.stats.title}
      description={app.organizationPage.stats.description}
    >
      <Stack gap={4}>
        <Flex justifyContent="space-between">
          <Text color="foreground.muted">Total Projects</Text>
          <Text>{projects.length}</Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text color="foreground.muted">Total Feedback</Text>
          <Text>
            {projects.reduce((acc, project) => acc + project.totalFeedback, 0)}
          </Text>
        </Flex>
        <Flex justifyContent="space-between">
          <Text color="foreground.muted">Active Users</Text>
          <Text>
            {projects.reduce((acc, project) => acc + project.activeUsers, 0)}
          </Text>
        </Flex>
      </Stack>
    </Card>
  );
};

export default OrganizationStats;

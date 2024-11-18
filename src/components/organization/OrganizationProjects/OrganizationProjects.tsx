import { Flex, Card, Button, Grid, GridItem, Icon } from "@omnidev/sigil";
import { FiArrowUpRight } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { OrganizationMetric } from "components/organization";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { app } from "lib/config";

import type { Project } from "app/[organization]/page";

dayjs.extend(relativeTime);

interface Props {
  projects: Project[];
}

const OrganizationProjects = ({ projects }: Props) => {
  return (
    <Card
      title={app.organizationPage.projects.title}
      description={app.organizationPage.projects.description}
      p={0}
      pos="relative"
    >
      <Button size="sm" position="absolute" top={2} m={2} right={2}>
        View All Projects
      </Button>

      <Grid height="400px" p={1} overflowY="scroll" pr={5}>
        {projects.map((project) => (
          <GridItem key={project.id}>
            <Card title={project.name} description={project.description}>
              <Button
                position="absolute"
                top={1}
                right={1}
                p={2}
                variant="icon"
                color={{
                  base: "foreground.muted",
                  _hover: "brand.primary",
                }}
                bgColor="transparent"
              >
                <Icon src={FiArrowUpRight} w={5} h={5} />
              </Button>

              <Flex justifyContent="space-between">
                <OrganizationMetric
                  icon={HiOutlineChatBubbleLeftRight}
                  value={project.totalFeedback}
                  type="Responses"
                />
                <OrganizationMetric
                  icon={HiOutlineUserGroup}
                  value={project.activeUsers}
                  type="Users"
                />
                <OrganizationMetric
                  icon={GoClock}
                  value={dayjs(project.lastUpdated).fromNow()}
                  type="Updated"
                  position="before"
                />
              </Flex>
            </Card>
          </GridItem>
        ))}
      </Grid>
    </Card>
  );
};

export default OrganizationProjects;

import { Text, Stack, Icon, Flex } from "@omnidev/sigil";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi2";

import { SectionContainer } from "components/layout";

import { app } from "lib/config";

interface Props {
  /** The name of the project. */
  projectName: string;
  /** The description of the project. */
  projectDescription: string;
}

const ProjectInformation = ({ projectName, projectDescription }: Props) => (
  <SectionContainer title={app.projectPage.projectInformation.title}>
    <Stack>
      <Text>{projectName}</Text>

      <Text color="foreground.subtle">{projectDescription}</Text>
    </Stack>

    <Stack>
      <Flex gap={2} align="center">
        <Icon src={HiOutlineUserGroup} />

        <Text color="foreground.muted">1,234 active Users</Text>
      </Flex>

      <Flex gap={2} align="center">
        <Icon src={IoCalendarOutline} />

        <Text color="foreground.muted">Created on Apr 1, 2024</Text>
      </Flex>
    </Stack>
  </SectionContainer>
);

export default ProjectInformation;

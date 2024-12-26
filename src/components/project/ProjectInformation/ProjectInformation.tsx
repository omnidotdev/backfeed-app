"use client";

import { Flex, Icon, Stack, Text } from "@omnidev/sigil";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoCalendarOutline } from "react-icons/io5";

import { SectionContainer } from "components/layout";

import { app } from "lib/config";

interface Props {
  /** The name of the project. */
  projectName: string;
  /** The description of the project. */
  projectDescription: string;
}

/**
 * Project information.
 */
const ProjectInformation = ({ projectName, projectDescription }: Props) => (
  <SectionContainer title={app.projectPage.projectInformation.title}>
    <Stack>
      <Text>{projectName}</Text>

      <Text color="foreground.subtle">{projectDescription}</Text>
    </Stack>

    <Flex justify="space-between" align="center">
      <Flex gap={2} align="center">
        <Icon src={HiOutlineUserGroup} />

        <Text color="foreground.muted">
          {app.projectPage.projectInformation.activeUsers}
        </Text>
      </Flex>

      <Text>1,234</Text>
    </Flex>

    <Flex justify="space-between" align="center">
      <Flex gap={2} align="center">
        <Icon src={IoCalendarOutline} />

        <Text color="foreground.muted">
          {app.projectPage.projectInformation.created}
        </Text>
      </Flex>

      <Text>Apr 1, 2024</Text>
    </Flex>
  </SectionContainer>
);

export default ProjectInformation;

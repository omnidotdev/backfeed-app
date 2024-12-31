"use client";

import { Flex, Icon, Stack, Text } from "@omnidev/sigil";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoCalendarOutline } from "react-icons/io5";

import { SectionContainer } from "components/layout";

import { app } from "lib/config";

import type { Project } from "generated/graphql";

interface Props {
  /** Name of the project. */
  name: Project["name"];
  /** Description of the project. */
  description: Project["description"];
}

/**
 * Project information.
 */
const ProjectInformation = ({ name, description }: Props) => {
  const information = [
    {
      title: app.projectPage.projectInformation.activeUsers,
      icon: HiOutlineUserGroup,
      value: "1,234",
    },
    {
      title: app.projectPage.projectInformation.created,
      icon: IoCalendarOutline,
      value: "Apr 1, 2024",
    },
  ];

  return (
    <SectionContainer title={app.projectPage.projectInformation.title}>
      <Stack>
        <Text>{name}</Text>

        <Text color="foreground.subtle">{description}</Text>
      </Stack>

      {information.map(({ title, icon, value }) => (
        <Flex key={title} justify="space-between" align="center">
          <Flex gap={2} align="center">
            <Icon src={icon} />

            <Text color="foreground.muted">{title}</Text>
          </Flex>

          <Text>{value}</Text>
        </Flex>
      ))}
    </SectionContainer>
  );
};

export default ProjectInformation;

"use client";

import { Flex, Icon, Text } from "@omnidev/sigil";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoCalendarOutline } from "react-icons/io5";

import { SectionContainer } from "components/layout";
import { app } from "lib/config";

interface Props {
  /** Date the project was created. */
  createdAt: string | undefined;
  /** Number of active users. */
  activeUsers: number | undefined;
  /** Whether loading the project data encountered an error. */
  isError?: boolean;
}

/**
 * Project information.
 */
const ProjectInformation = ({ createdAt, activeUsers, isError }: Props) => {
  const information = [
    {
      title: app.projectPage.projectInformation.created,
      icon: IoCalendarOutline,
      value: createdAt,
    },
    {
      title: app.projectPage.projectInformation.activeUsers,
      icon: HiOutlineUserGroup,
      value: activeUsers,
    },
  ];

  return (
    <SectionContainer title={app.projectPage.projectInformation.title}>
      {information.map(({ title, icon, value }) => (
        <Flex key={title} justify="space-between" align="center">
          <Flex gap={2} align="center">
            <Icon src={icon} />

            <Text color="foreground.muted">{title}</Text>
          </Flex>

          <Text fontSize={{ base: "sm", lg: "md" }} textAlign="right">
            {isError ? 0 : value}
          </Text>
        </Flex>
      ))}
    </SectionContainer>
  );
};

export default ProjectInformation;

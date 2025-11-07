"use client";

import { Flex, Icon, Skeleton, Text } from "@omnidev/sigil";
import { SectionContainer } from "components/layout";
import { app } from "lib/config";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoCalendarOutline } from "react-icons/io5";

interface Props {
  /** Date the project was created. */
  createdAt: string | undefined;
  /** Number of active users. */
  activeUsers: number | undefined;
  /** Whether the project data is loaded. */
  isLoaded?: boolean;
  /** Whether loading the project data encountered an error. */
  isError?: boolean;
}

/**
 * Project information.
 */
const ProjectInformation = ({
  createdAt,
  activeUsers,
  isLoaded,
  isError,
}: Props) => {
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
    <SectionContainer
      title={app.projectPage.projectInformation.title}
      titleProps={{ fontSize: "md" }}
    >
      {information.map(({ title, icon, value }) => (
        <Flex key={title} justify="space-between" align="center">
          <Flex gap={2} align="center">
            <Icon src={icon} />

            <Text color="foreground.muted" fontSize="sm">
              {title}
            </Text>
          </Flex>

          <Skeleton isLoaded={isLoaded} minW={8}>
            <Text fontSize="sm" textAlign="right">
              {isError ? 0 : value}
            </Text>
          </Skeleton>
        </Flex>
      ))}
    </SectionContainer>
  );
};

export default ProjectInformation;

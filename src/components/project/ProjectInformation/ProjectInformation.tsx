"use client";

import { Flex, Icon, Text, Skeleton } from "@omnidev/sigil";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoCalendarOutline } from "react-icons/io5";
import dayjs from "dayjs";

import { SectionContainer } from "components/layout";
import { app } from "lib/config";

import type { Project } from "generated/graphql";

interface Props {
  /** Date the project was created. */
  createdAt: Project["createdAt"];
  /** Number of active users. */
  activeUsers: number;
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
      value: dayjs(createdAt).format("M/D/YYYY"),
    },
    {
      title: app.projectPage.projectInformation.activeUsers,
      icon: HiOutlineUserGroup,
      value: Number.isNaN(activeUsers) ? 0 : activeUsers,
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

          <Skeleton isLoaded={isLoaded} minW={8}>
            <Text fontSize={{ base: "sm", lg: "md" }} textAlign="right">
              {isError ? 0 : value}
            </Text>
          </Skeleton>
        </Flex>
      ))}
    </SectionContainer>
  );
};

export default ProjectInformation;

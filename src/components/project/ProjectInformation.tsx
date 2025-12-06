import { Flex, Icon, Text } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "@tanstack/react-router";
import dayjs from "dayjs";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoCalendarOutline } from "react-icons/io5";

import SectionContainer from "@/components/layout/SectionContainer";
import app from "@/lib/config/app.config";
import { projectMetricsOptions } from "@/lib/options/projects";

/**
 * Project information.
 */
const ProjectInformation = () => {
  const { projectId } = useLoaderData({
    from: "/_auth/organizations/$organizationSlug/_layout/projects/$projectSlug/",
  });

  const { data: projectMetrics, isError } = useQuery({
    ...projectMetricsOptions({ projectId }),
    select: (data) => ({
      createdAt: dayjs(data?.project?.createdAt).format("M/D/YYYY"),
      activeUsers: Number(
        data?.project?.posts.aggregates?.distinctCount?.userId,
      ),
    }),
  });

  const information = [
    {
      title: app.projectPage.projectInformation.created,
      icon: IoCalendarOutline,
      value: projectMetrics?.createdAt,
    },
    {
      title: app.projectPage.projectInformation.activeUsers,
      icon: HiOutlineUserGroup,
      value: projectMetrics?.activeUsers,
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

          <Text fontSize="sm" textAlign="right">
            {isError ? 0 : value}
          </Text>
        </Flex>
      ))}
    </SectionContainer>
  );
};

export default ProjectInformation;

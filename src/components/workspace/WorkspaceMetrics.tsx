import { Flex, Grid, Icon, Skeleton, Text } from "@omnidev/sigil";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { HiOutlineChatBubbleLeftRight, HiOutlineFolder } from "react-icons/hi2";

import SectionContainer from "@/components/layout/SectionContainer";
import app from "@/lib/config/app.config";
import { workspaceMetricsOptions } from "@/lib/options/workspaces";

import type { FlexProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

const workspaceLayoutRoute = getRouteApi(
  "/_public/workspaces/$workspaceSlug/_layout/",
);

interface WorkspaceMetric extends FlexProps {
  /** Human-readable title. */
  title: string;
  /** Actual metric value. */
  value: number;
  /** Visual icon. */
  icon: IconType;
}

/**
 * Workspace metrics.
 */
const WorkspaceMetrics = () => {
  const { organizationId } = workspaceLayoutRoute.useRouteContext();

  const {
    data: workspaceMetrics,
    isLoading,
    isError,
  } = useQuery({
    ...workspaceMetricsOptions({
      organizationId,
    }),
    select: (data) => ({
      totalProjects: data?.projects?.totalCount,
      totalPosts: data?.posts?.totalCount,
    }),
  });

  const WORKSPACE_METRICS: WorkspaceMetric[] = [
    {
      title: app.workspacePage.metrics.data.totalProjects.title,
      value: workspaceMetrics?.totalProjects ?? 0,
      icon: HiOutlineFolder,
    },
    {
      title: app.workspacePage.metrics.data.totalPosts.title,
      value: workspaceMetrics?.totalPosts ?? 0,
      icon: HiOutlineChatBubbleLeftRight,
    },
  ];

  return (
    <SectionContainer
      title={app.workspacePage.metrics.title}
      description={app.workspacePage.metrics.description}
    >
      <Grid h="full">
        {WORKSPACE_METRICS.map(({ title, value, icon, ...rest }) => (
          <Flex
            key={title}
            alignItems="center"
            justifyContent="space-between"
            {...rest}
          >
            <Flex gap={2} alignItems="center">
              <Icon src={icon} w={4} h={4} />

              <Text
                fontSize={{ base: "sm", lg: "md" }}
                color="foreground.muted"
              >
                {title}
              </Text>
            </Flex>

            <Skeleton isLoaded={!isLoading} minW={8}>
              <Text fontSize={{ base: "sm", lg: "md" }} textAlign="right">
                {isError ? 0 : value}
              </Text>
            </Skeleton>
          </Flex>
        ))}
      </Grid>
    </SectionContainer>
  );
};

export default WorkspaceMetrics;

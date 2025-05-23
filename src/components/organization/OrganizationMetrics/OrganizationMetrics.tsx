"use client";

import { Flex, Grid, Icon, Skeleton, Text } from "@omnidev/sigil";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineFolder,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { SectionContainer } from "components/layout";
import { useOrganizationMetricsQuery } from "generated/graphql";
import { app } from "lib/config";

import type { FlexProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface Props {
  /** Organization ID. */
  organizationId: string;
}

interface OrganizationMetric extends FlexProps {
  /** Human-readable title. */
  title: string;
  /** Actual metric value. */
  value: number;
  /** Visual icon. */
  icon: IconType;
}

/**
 * Organization metrics.
 */
const OrganizationMetrics = ({ organizationId }: Props) => {
  const {
    data: organizationMetrics,
    isLoading,
    isError,
  } = useOrganizationMetricsQuery(
    {
      organizationId,
    },
    {
      select: (data) => ({
        totalProjects: data?.projects?.totalCount,
        totalFeedback: data?.posts?.totalCount,
        activeUsers: data?.members?.totalCount,
      }),
    },
  );

  const ORGANIZATION_METRICS: OrganizationMetric[] = [
    {
      title: app.organizationPage.metrics.data.totalProjects.title,
      value: organizationMetrics?.totalProjects ?? 0,
      icon: HiOutlineFolder,
    },
    {
      title: app.organizationPage.metrics.data.totalFeedback.title,
      value: organizationMetrics?.totalFeedback ?? 0,
      icon: HiOutlineChatBubbleLeftRight,
    },
    {
      title: app.organizationPage.metrics.data.activeUsers.title,
      value: organizationMetrics?.activeUsers ?? 0,
      icon: HiOutlineUserGroup,
    },
  ];

  return (
    <SectionContainer
      title={app.organizationPage.metrics.title}
      description={app.organizationPage.metrics.description}
    >
      <Grid h="full">
        {ORGANIZATION_METRICS.map(({ title, value, icon, ...rest }) => (
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

export default OrganizationMetrics;

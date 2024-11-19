import { Flex, Skeleton, Text, Icon, Grid } from "@omnidev/sigil";
import {
  HiOutlineFolder,
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { SectionContainer } from "components/core";
import { app } from "lib/config";

import type { FlexProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface Props {
  /** The total amount of organization projects */
  totalProjects: number;
  /** The total amount of feedback across all projects */
  totalFeedback: number;
  /** The total amount of active users across all projects */
  activeUsers: number;
  /** Whether the organization data is loaded. */
  isLoaded?: boolean;
  /** Whether loading the organization data encountered an error. */
  isError?: boolean;
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
const OrganizationMetrics = ({
  totalProjects,
  totalFeedback,
  activeUsers,
  isLoaded,
  isError,
}: Props) => {
  const ORGANIZATION_METRICS: OrganizationMetric[] = [
    {
      title: app.organizationPage.metrics.data.totalProjects.title,
      value: totalProjects,
      icon: HiOutlineFolder,
    },
    {
      title: app.organizationPage.metrics.data.totalFeedback.title,
      value: totalFeedback,
      icon: HiOutlineChatBubbleLeftRight,
    },
    {
      title: app.organizationPage.metrics.data.activeUsers.title,
      value: activeUsers,
      icon: HiOutlineUserGroup,
    },
  ];

  return (
    <SectionContainer
      title={app.organizationPage.metrics.title}
      description={app.organizationPage.metrics.description}
    >
      <Grid gap={4} h="100%">
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

            <Skeleton isLoaded={isLoaded} minW={8}>
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

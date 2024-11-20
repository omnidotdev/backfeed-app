import { Flex, Grid, Icon, Skeleton, Text } from "@omnidev/sigil";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineFolder,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { SectionContainer } from "components/layout";
import { app } from "lib/config";
import { useDataState } from "lib/hooks";

import type { FlexProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

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
const OrganizationMetrics = () => {
  // !NB: this is to represent where we would want to fetch the aggregate data (total projects, total feedback, and active users). This will keep the top level `organizationQuery` clean.
  const { isLoading, isError } = useDataState({ timeout: 800 });

  const ORGANIZATION_METRICS: OrganizationMetric[] = [
    {
      title: app.organizationPage.metrics.data.totalProjects.title,
      value: 6,
      icon: HiOutlineFolder,
    },
    {
      title: app.organizationPage.metrics.data.totalFeedback.title,
      value: 420,
      icon: HiOutlineChatBubbleLeftRight,
    },
    {
      title: app.organizationPage.metrics.data.activeUsers.title,
      value: 1337,
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

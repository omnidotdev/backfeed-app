import { Flex, Grid, Icon, Stack, Text, css } from "@omnidev/sigil";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import OverflowText from "@/components/core/OverflowText";
import setSingularOrPlural from "@/lib/util/setSingularOrPlural";

import type { FlexProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";
import type { Project } from "@/generated/graphql";

interface ProjectMetric {
  /** Visual icon. */
  icon: IconType;
  /** Metric value. */
  value: number | undefined;
  /** Metric type. */
  type: "response" | "user";
}

interface Props extends FlexProps {
  /** Project details. */
  project: Partial<Project>;
}

/**
 * Project, nested within a workspace. A project outlines an application or other kind of product or service that aggregates and contains scoped feedback.
 */
const ProjectCard = ({ project, ...rest }: Props) => {
  const PROJECT_METRICS: ProjectMetric[] = [
    {
      icon: HiOutlineChatBubbleLeftRight,
      value: project?.posts?.totalCount,
      type: "response",
    },
    {
      icon: HiOutlineUserGroup,
      value: Number(project?.posts?.aggregates?.distinctCount?.userId),
      type: "user",
    },
  ];

  return (
    <Flex
      position="relative"
      direction="column"
      bgColor="card-item"
      borderRadius="xl"
      borderWidth="1px"
      borderColor={{ base: "neutral.200", _dark: "neutral.800" }}
      p={8}
      cursor="pointer"
      className={css({
        transition: "all 0.2s ease",
        _groupHover: {
          bgColor: { base: "neutral.50", _dark: "neutral.800/50" },
          borderColor: { base: "neutral.300", _dark: "neutral.700" },
          transform: "translateY(-2px)",
          boxShadow: "glow-card",
        },
      })}
      {...rest}
    >
      <Stack gap={6} h="100%" justify="space-between">
        <Stack minH={{ base: 16, md: 24 }}>
          <OverflowText
            fontSize={{ base: "md", lg: "lg" }}
            fontWeight="semibold"
            lineHeight={1.2}
            lineClamp={2}
          >
            {project?.name}
          </OverflowText>

          <OverflowText
            fontSize={{ base: "xs", lg: "sm" }}
            color="foreground.subtle"
            lineClamp={2}
          >
            {project?.description}
          </OverflowText>
        </Stack>

        <Grid columns={2} w="full" alignItems="start">
          {PROJECT_METRICS.map(({ icon, value, type }) => (
            <Flex key={type} gap={2} alignItems="center" wrap="wrap">
              <Icon src={icon} w={5} h={5} color="foreground.subtle" />

              <Flex color="foreground.subtle" fontSize="sm" gap={1} wrap="wrap">
                <Text>{value ?? 0}</Text>

                <Text display={{ base: "none", sm: "inline" }}>
                  {setSingularOrPlural({ value: value ?? 0, label: type })}
                </Text>
              </Flex>
            </Flex>
          ))}
        </Grid>
      </Stack>
    </Flex>
  );
};

export default ProjectCard;

"use client";

import { Button, Flex, Grid, Icon, Stack, Text } from "@omnidev/sigil";
import { OverflowText } from "components/core";
import { setSingularOrPlural } from "lib/util";
import { FiArrowUpRight } from "react-icons/fi";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import type { FlexProps } from "@omnidev/sigil";
import type { Project } from "generated/graphql";
import type { IconType } from "react-icons";

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
 * Project, nested within an organization. A project outlines an application or other kind of product or service that aggregates and contains scoped feedback.
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
      borderRadius="lg"
      p={8}
      {...rest}
    >
      <Button
        position="absolute"
        top={1}
        right={1}
        p={2}
        variant="icon"
        color={{ base: "foreground.muted", _groupHover: "brand.primary" }}
        bgColor="transparent"
      >
        <Icon src={FiArrowUpRight} w={5} h={5} />
      </Button>

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

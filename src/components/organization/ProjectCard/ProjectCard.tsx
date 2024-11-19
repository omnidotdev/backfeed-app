import { Button, Flex, Grid, Icon, Stack, Text } from "@omnidev/sigil";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import type { FlexProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface ProjectMetric {
  /** Visual icon. */
  icon: IconType;
  /** Metric value. */
  value: string | number;
  /** Metric type. */
  type: "Responses" | "Users" | "Updated";
  /** Container props for `type` and `value`. Used to override default styles. */
  containerProps?: FlexProps;
}

interface Props {
  /** Name of the organization. */
  name: string;
  /** Description of the organization. */
  description: string;
  /** Total feedback for the project. */
  totalFeedback: number;
  /** Number of active users for the project. */
  activeUsers: number;
  /** The last updated date of the project. */
  lastUpdated: string;
}

/**
 * Project, nested within an organization. A project outlines an application or other kind of product or service that aggregates and contains scoped feedback.
 */
const ProjectCard = ({
  name,
  description,
  totalFeedback,
  activeUsers,
  lastUpdated,
  ...rest
}: Props) => {
  const PROJECT_METRICS: ProjectMetric[] = [
    {
      icon: HiOutlineChatBubbleLeftRight,
      value: totalFeedback,
      type: "Responses",
    },
    {
      icon: HiOutlineUserGroup,
      value: activeUsers,
      type: "Users",
    },
  ];

  return (
    <Flex
      position="relative"
      direction="column"
      bgColor="background.subtle"
      borderRadius="lg"
      boxShadow="xs"
      p={8}
      {...rest}
    >
      <Link href="#">
        <Button
          position="absolute"
          top={1}
          right={1}
          p={2}
          variant="icon"
          color={{ base: "foreground.muted", _hover: "brand.primary" }}
          bgColor="transparent"
        >
          <Icon src={FiArrowUpRight} w={5} h={5} />
        </Button>
      </Link>

      <Stack gap={6} h="100%">
        <Stack minH={{ base: 16, md: 24 }}>
          <Text
            fontSize={{ base: "md", lg: "lg" }}
            fontWeight="semibold"
            lineHeight={1.2}
            lineClamp={2}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {name}
          </Text>

          <Text
            fontSize={{ base: "xs", lg: "sm" }}
            color="foreground.subtle"
            lineClamp={2}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {description}
          </Text>
        </Stack>

        <Grid columns={2} w="full" alignItems="start">
          {PROJECT_METRICS.map(({ icon, value, type, containerProps }) => (
            <Flex key={type} gap={2} alignItems="center">
              <Icon src={icon} w={5} h={5} color="foreground.subtle" />

              <Flex
                color="foreground.subtle"
                fontSize="sm"
                gap={1}
                direction="row-reverse"
                {...containerProps}
              >
                <Text
                  display={{
                    base: "none",
                    xl: "inline",
                  }}
                >
                  {type}
                </Text>

                <Text>{value}</Text>
              </Flex>
            </Flex>
          ))}
        </Grid>
      </Stack>
    </Flex>
  );
};

export default ProjectCard;

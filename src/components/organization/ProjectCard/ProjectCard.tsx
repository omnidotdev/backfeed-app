import { Button, Flex, Grid, Icon, Stack, Text } from "@omnidev/sigil";
import dayjs from "dayjs";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { GoClock } from "react-icons/go";
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
    {
      icon: GoClock,
      value: dayjs(lastUpdated).fromNow(),
      type: "Updated",
      containerProps: { direction: "row" },
    },
  ];

  return (
    <Flex
      position="relative"
      direction="column"
      bgColor="background.subtle"
      borderRadius="lg"
      boxShadow="xs"
      h="200px"
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

      <Stack justifyContent="space-between" h="100%" gap={6}>
        <Stack>
          <Text
            fontSize={{ base: "md", lg: "lg" }}
            fontWeight="semibold"
            lineHeight={1.2}
          >
            {name}
          </Text>

          <Text
            lineClamp={2}
            fontSize={{ base: "xs", lg: "sm" }}
            color="foreground.subtle"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {description}
          </Text>
        </Stack>

        <Grid columns={{ base: 1, sm: 3 }} mt={6} alignItems="start">
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
                    base: "inline",
                    sm: "none",
                    md: "inline",
                    lg: "none",
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

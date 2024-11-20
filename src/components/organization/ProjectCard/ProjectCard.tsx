import {
  Button,
  Flex,
  Grid,
  Icon,
  Skeleton,
  Stack,
  Text,
} from "@omnidev/sigil";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FiArrowUpRight } from "react-icons/fi";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { useDataState } from "lib/hooks";

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

interface Props extends FlexProps {
  /** Project ID. */
  id: string;
  /** Name of the organization. */
  name: string;
  /** Description of the organization. */
  description: string;
}

/**
 * Project, nested within an organization. A project outlines an application or other kind of product or service that aggregates and contains scoped feedback.
 */
const ProjectCard = ({ id, name, description, ...rest }: Props) => {
  // !NB: this is to represent where we would want to fetch the aggregate data (total feedback and active users). This will keep the top level `projectsQuery` clean.
  const { isLoading, isError } = useDataState({ timeout: 800 });

  const params = useParams<{ organizationId: string }>();

  const PROJECT_METRICS: ProjectMetric[] = [
    {
      icon: HiOutlineChatBubbleLeftRight,
      value: 420,
      type: "Responses",
    },
    {
      icon: HiOutlineUserGroup,
      value: 69,
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
      <Link href={`/${params.organizationId}/projects/${id}`}>
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

      <Stack gap={6} h="100%" justify="space-between">
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

              <Skeleton isLoaded={!isLoading}>
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

                  <Text>{isError ? 0 : value}</Text>
                </Flex>
              </Skeleton>
            </Flex>
          ))}
        </Grid>
      </Stack>
    </Flex>
  );
};

export default ProjectCard;

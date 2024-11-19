import { Flex, Icon, Skeleton, Text } from "@omnidev/sigil";

import type { IconType } from "react-icons";

interface Props {
  /** Metric type. */
  type: "Members" | "Projects";
  /** Metric value. */
  value: number;
  /** Visual icon. */
  icon: IconType;
  /** Whether the data is loading. */
  isLoading?: boolean;
  /** Whether an error was encountered while loading the data. */
  isError?: boolean;
}

/**
 * Dashboard metric.
 */
const DashboardMetric = ({
  type,
  value,
  icon,
  isLoading = true,
  isError = false,
}: Props) => (
  <Flex align="center" gap={2}>
    <Icon src={icon} w={5} h={5} color="foreground.subtle" />

    <Skeleton isLoaded={!isLoading}>
      {isError ? (
        <Text color="foreground.subtle" fontSize="sm">
          Error
        </Text>
      ) : (
        <Flex color="foreground.subtle" fontSize="sm" gap={1}>
          <Text>{value}</Text>

          <Text display={{ base: "none", smToMd: "inline", xl: "inline" }}>
            {type}
          </Text>
        </Flex>
      )}
    </Skeleton>
  </Flex>
);

export default DashboardMetric;

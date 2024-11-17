import { Flex, Icon, Skeleton, Text } from "@omnidev/sigil";

import type { IconType } from "react-icons";

interface Props {
  /** Statistic title (human-readable label). */
  title: string;
  /** Statistic value. */
  value: string | number;
  /** Visual icon. */
  icon: IconType;
  /** Whether the statistic data is loaded. */
  isLoaded?: boolean;
  /** Whether loading the statistic data encountered an error. */
  isError?: boolean;
}

/**
 * Aggregate statistic card. Displays KPI information such as total feedback, active users, or average response time.
 */
const Aggregate = ({ title, value, icon, isLoaded = true, isError }: Props) => (
  <Flex
    direction="column"
    gap={3}
    borderColor="border.subtle"
    p={6}
    bgColor="background.default"
    borderRadius="lg"
    boxShadow="lg"
  >
    <Flex align="center" justify="space-between" gap={2}>
      <Text color="foreground.subtle" fontSize="sm" fontWeight="medium">
        {title}
      </Text>

      <Icon src={icon} w={5} h={5} color="foreground.subtle" />
    </Flex>

    <Flex direction="column" gap={1}>
      <Skeleton isLoaded={isLoaded} maxW={!isLoaded ? 32 : undefined}>
        <Text fontSize="2xl" fontWeight="semibold" lineHeight={1.2}>
          {isError ? "Error" : value}
        </Text>
      </Skeleton>

      <Skeleton isLoaded={isLoaded} maxW={!isLoaded ? 40 : undefined}>
        <Text fontSize="xs" color="green" fontWeight="medium">
          {isError ? "Error" : "+4.2069% from last month"}
        </Text>
      </Skeleton>
    </Flex>
  </Flex>
);

export default Aggregate;

import { Flex, Icon, Skeleton, Text } from "@omnidev/sigil";

import type { IconType } from "react-icons";

interface Props {
  title: string;
  value: string | number;
  icon: IconType;
  isLoaded?: boolean;
}

/**
 * Aggregate statistic card. Displays information about the total feedback, active users, or average response time
 */
const Aggregate = ({ title, value, icon, isLoaded = true }: Props) => (
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
          {value}
        </Text>
      </Skeleton>

      <Skeleton isLoaded={isLoaded} maxW={!isLoaded ? 40 : undefined}>
        <Text fontSize="xs" color="green" fontWeight="medium">
          +4.2069% from last month
        </Text>
      </Skeleton>
    </Flex>
  </Flex>
);

export default Aggregate;

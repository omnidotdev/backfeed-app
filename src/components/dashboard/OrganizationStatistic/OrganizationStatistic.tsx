import { Flex, Icon, Text } from "@omnidev/sigil";

import type { IconType } from "react-icons";

interface Props {
  /** Statistic type. */
  type: "Members" | "Projects";
  /** Statistic value. */
  value: number;
  /** Visual icon. */
  icon: IconType;
}

/**
 * Organization statistic.
 */
const OrganizationStatistic = ({ type, value, icon }: Props) => (
  <Flex direction="column" gap={4}>
    <Flex align="center" gap={2}>
      <Icon src={icon} w={5} h={5} color="foreground.subtle" />

      <Flex color="foreground.subtle" fontSize="sm" gap={1}>
        <Text>{value}</Text>

        <Text display={{ base: "none", xl: "inline" }}>{type}</Text>
      </Flex>
    </Flex>
  </Flex>
);

export default OrganizationStatistic;

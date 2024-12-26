"use client";

import { Flex, Icon, Text } from "@omnidev/sigil";

import type { IconType } from "react-icons";

interface Props {
  /** Metric type. */
  type: "Members" | "Projects";
  /** Metric value. */
  value: number | undefined;
  /** Visual icon. */
  icon: IconType;
}

/**
 * Dashboard metric.
 */
const DashboardMetric = ({ type, value = 0, icon }: Props) => (
  <Flex align="center" gap={2}>
    <Icon src={icon} w={5} h={5} color="foreground.subtle" />

    <Flex color="foreground.subtle" fontSize="sm" gap={1}>
      <Text>{value}</Text>

      <Text display={{ base: "none", smToMd: "inline", xl: "inline" }}>
        {type}
      </Text>
    </Flex>
  </Flex>
);

export default DashboardMetric;

import { Flex, Icon, Text } from "@omnidev/sigil";

import setSingularOrPlural from "@/lib/util/setSingularOrPlural";

import type { IconType } from "react-icons";

interface Props {
  /** Metric type. */
  type: "member" | "project";
  /** Metric value. */
  value: number | undefined;
  /** Visual icon. */
  icon: IconType;
}

/**
 * Dashboard metric.
 */
const DashboardMetric = ({ type, value = 0, icon }: Props) => (
  <Flex
    direction={{ mdToLg: "column" }}
    align={{ base: "center", mdToLg: "flex-start" }}
    gap={2}
  >
    <Icon src={icon} w={5} h={5} color="foreground.subtle" />

    <Flex color="foreground.subtle" fontSize="sm" gap={1}>
      <Text>{value}</Text>

      <Text>{setSingularOrPlural({ value, label: type })}</Text>
    </Flex>
  </Flex>
);

export default DashboardMetric;

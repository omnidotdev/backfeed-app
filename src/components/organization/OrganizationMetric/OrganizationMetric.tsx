import { Flex, Icon, Text } from "@omnidev/sigil";

import type { IconType } from "react-icons";

interface Props {
  /** Visual icon. */
  icon: IconType;
  /** Metric value. */
  value: string | number;
  /** Metric type. */
  type: "Responses" | "Users" | "Updated";
  /**
   * Optional position of the type relative to the value.
   * If "before", the label appears before the value.
   * If "after", the label appears after the value.
   * Defaults to "after" if not specified.
   */
  position?: "before" | "after";
}

/**
 * Organization metric.
 */
const OrganizationMetric = ({
  type,
  value,
  icon,
  position = "after",
}: Props) => (
  <Flex gap={2} alignItems="center">
    <Icon src={icon} w={5} h={5} color="foreground.subtle" />

    <Flex color="foreground.subtle" fontSize="sm" gap={1}>
      {position === "before" && (
        <Text display={{ base: "none", smToMd: "inline", xl: "inline" }}>
          {type}
        </Text>
      )}

      <Text>{value}</Text>

      {position !== "before" && (
        <Text display={{ base: "none", smToMd: "inline", xl: "inline" }}>
          {type}
        </Text>
      )}
    </Flex>
  </Flex>
);

export default OrganizationMetric;

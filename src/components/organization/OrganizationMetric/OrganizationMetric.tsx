import { Flex, Icon, Text } from "@omnidev/sigil";

import type { FlexProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface Props {
  /** Visual icon. */
  icon: IconType;
  /** Metric value. */
  value: string | number;
  /** Metric type. */
  type: "Responses" | "Users" | "Updated";
  /** Container props for `type` and `value`. Used to override default styles. */
  containerProps?: FlexProps;
}

/**
 * Organization metric.
 */
const OrganizationMetric = ({ type, value, icon, containerProps }: Props) => (
  <Flex gap={2} alignItems="center">
    <Icon src={icon} w={5} h={5} color="foreground.subtle" />

    <Flex
      color="foreground.subtle"
      fontSize="sm"
      gap={1}
      direction="row-reverse"
      {...containerProps}
    >
      <Text display={{ base: "none", smToMd: "inline", xl: "inline" }}>
        {type}
      </Text>

      <Text>{value}</Text>
    </Flex>
  </Flex>
);

export default OrganizationMetric;

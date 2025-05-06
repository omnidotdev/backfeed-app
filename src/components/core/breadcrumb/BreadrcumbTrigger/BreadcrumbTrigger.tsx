import { Flex, Icon } from "@omnidev/sigil";
import { FiChevronDown } from "react-icons/fi";

import { OverflowText } from "components/core";

interface Props {
  /** Label for the breadcrumb. */
  label: string;
  /** Whether the breadcrumb is the last item. */
  isLastItem: boolean;
  /** Icon for the breadcrumb. */
  icon?: boolean;
}

/**
 * Breadcrumb trigger.
 */
const BreadcrumbTrigger = ({ label, isLastItem, icon }: Props) => (
  <Flex cursor="pointer" align="center">
    <OverflowText
      color={
        isLastItem
          ? "foreground.default"
          : { base: "foreground.subtle", _hover: "foreground.default" }
      }
    >
      {label}

      {icon && <Icon ml={1} size="xs" src={FiChevronDown} />}
    </OverflowText>
  </Flex>
);

export default BreadcrumbTrigger;

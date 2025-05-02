import { Icon, Text } from "@omnidev/sigil";
import { FiChevronDown } from "react-icons/fi";

const sharedTextStyles = {
  cursor: "pointer",
  color: {
    base: "foreground.subtle",
    _hover: "foreground.default",
  },
};

interface Props {
  /** Label for the breadcrumb. */
  label: string;
  /** Whether the breadcrumb is the last item. */
  isLastItem: boolean;
  /** Icon for the breadcrumb. */
  icon?: boolean;
}

const BreadcrumbTrigger = ({ label, isLastItem, icon }: Props) => (
  <>
    <Text
      display={isLastItem ? "none" : { base: "inline", lg: "none" }}
      {...sharedTextStyles}
    >
      ...
    </Text>

    <Text
      display={isLastItem ? "inline" : { base: "none", lg: "inline" }}
      {...sharedTextStyles}
    >
      {label}

      {icon && <Icon size="xs" src={FiChevronDown} />}
    </Text>
  </>
);

export default BreadcrumbTrigger;

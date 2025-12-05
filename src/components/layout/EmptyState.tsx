import { Button, Center, Flex, Icon, Tooltip } from "@omnidev/sigil";

import type { FlexProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface ActionProps {
  /** Text displayed on the action button. */
  label: string;
  /** Function to execute when the action button is clicked. */
  onClick: () => void;
  /** Icon displayed in the action button. */
  icon?: IconType;
  /** Whether the action button is disabled. */
  disabled?: boolean;
  /** Optional tooltip shown when the action button is disabled. */
  tooltip?: string;
}

interface Props extends FlexProps {
  /** Readable message. */
  message: string;
  /** Optional CTA event. */
  action?: ActionProps;
}

/**
 * Empty state component. Displays a message and an optional CTA when a successful query has no results.
 */
const EmptyState = ({ message, action, ...rest }: Props) => (
  <Flex
    direction="column"
    align="center"
    justify="center"
    textAlign="center"
    borderRadius="md"
    borderWidth="1px"
    borderStyle="dashed"
    gap={6}
    p={4}
    {...rest}
  >
    {message}

    {action && (
      <Tooltip
        hasArrow={false}
        trigger={
          <Button
            asChild
            variant="outline"
            size="sm"
            disabled={action.disabled}
            onClick={action.onClick}
          >
            {/* NB: Wrap content in a single element (Center) to satisfy React.Children.only requirement for asChild rendering. */}
            <Center>
              {action.icon && <Icon src={action.icon} w={4} h={4} />}

              {action.label}
            </Center>
          </Button>
        }
        triggerProps={{ style: { all: "unset" } }}
        contentProps={{
          display: !action?.disabled || !action.tooltip ? "none" : undefined,
          fontSize: "sm",
        }}
      >
        {action.tooltip}
      </Tooltip>
    )}
  </Flex>
);

export default EmptyState;

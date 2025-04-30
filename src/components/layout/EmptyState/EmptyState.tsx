"use client";

import { Button, Center, Flex, Icon, Tooltip } from "@omnidev/sigil";

import type { ButtonProps, FlexProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface Props extends FlexProps {
  /** Readable message. */
  message: string;
  /** Optional CTA event. */
  action?: {
    /** Action label. */
    label: string;
    /** Action icon. */
    icon?: IconType;
    /** Action props. */
    actionProps?: ButtonProps;
  };
  /** Optional tooltip for disabled action state. */
  tooltip?: string;
}

/**
 * Empty state component. Displays a message and an optional CTA when a successful query has no results.
 */
const EmptyState = ({ message, action, tooltip, ...rest }: Props) => (
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

    {/* NB: Show tooltip only if the action button is disabled and a tooltip label is provided; otherwise, render the button normally. */}
    {action &&
      (action.actionProps?.disabled && tooltip ? (
        <Tooltip
          hasArrow={false}
          trigger={
            <Button {...action.actionProps} asChild>
              {/* NB: Wrap content in a single element (Center) to satisfy React.Children.only requirement for asChild rendering. */}
              <Center>
                {action.icon && <Icon src={action.icon} w={4} h={4} />}

                {action.label}
              </Center>
            </Button>
          }
          triggerProps={{ style: { all: "unset" } }}
        >
          {tooltip}
        </Tooltip>
      ) : (
        <Button {...action.actionProps}>
          {action.icon && <Icon src={action.icon} w={4} h={4} />}

          {action.label}
        </Button>
      ))}
  </Flex>
);

export default EmptyState;

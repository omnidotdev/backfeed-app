"use client";

import { Button, Flex, Icon } from "@omnidev/sigil";

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
}

/**
 * Empty state component. Displays a message and an optional CTA when a successful query has no results.
 */
const EmptyState = ({ message, action, ...rest }: Props) => (
  <Flex
    direction="column"
    align="center"
    justify="center"
    borderRadius="md"
    borderWidth="1px"
    borderStyle="dashed"
    gap={6}
    {...rest}
  >
    {message}

    {action && (
      <Button {...action.actionProps}>
        {action.icon && <Icon src={action.icon} w={4} h={4} />}

        {action.label}
      </Button>
    )}
  </Flex>
);

export default EmptyState;

"use client";

import { Button, Dialog, HStack, Icon, useDisclosure } from "@omnidev/sigil";
import { HiOutlineTrash } from "react-icons/hi2";

import { app } from "lib/config";

import type { ButtonProps, DialogProps, IconProps } from "@omnidev/sigil";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";

const destructiveButtonStyles = {
  color: "white",
  backgroundColor: {
    base: "#ef4444",
    _hover: "#dc2626",
    _active: "#b91c1c",
    _focus: "#b91c1c",
  },
};

interface Action extends ButtonProps {
  /** Action label. */
  label: string;
}

export interface Props extends DialogProps {
  /** Dialog title. */
  title: string;
  /** Dialog description. */
  description: string;
  /** Primary dialog action. */
  action: Action;
  /** Icon used for the default dialog trigger. */
  icon?: IconType;
  /** Children to render in the dialog content area. */
  children?: ReactNode;
  /** Dialog trigger button label. */
  triggerLabel?: string;
  /** Icon props. */
  iconProps?: Omit<IconProps, "src">;
}

/**
 * Dialog for destructive actions.
 */
const DestructiveAction = ({
  title,
  description,
  action,
  icon = HiOutlineTrash,
  triggerProps,
  iconProps,
  children,
  triggerLabel,
  ...rest
}: Props) => {
  const { isOpen, onClose, onToggle } = useDisclosure();

  const actions: Action[] = [
    {
      ...action,
      variant: "solid",
      ...destructiveButtonStyles,
      onClick: (e) => {
        action.onClick?.(e);
        onClose();
      },
    },
    {
      label: app.actions.cancel.label,
      onClick: onClose,
      variant: "outline",
    },
  ];

  return (
    <Dialog
      title={title}
      description={description}
      open={isOpen}
      onOpenChange={onToggle}
      trigger={
        <Button
          type="button"
          variant="solid"
          fontSize="md"
          {...destructiveButtonStyles}
          {...triggerProps}
        >
          <Icon src={icon} {...iconProps} />

          {triggerLabel}
        </Button>
      }
      triggerProps={triggerProps}
      {...rest}
    >
      {children}

      <HStack>
        {actions.map(({ label, ...rest }) => (
          <Button key={label} flex={1} {...rest}>
            {label}
          </Button>
        ))}
      </HStack>
    </Dialog>
  );
};

export default DestructiveAction;

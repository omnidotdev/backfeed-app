"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  HStack,
  Icon,
  Input,
  Label,
  Stack,
  useDisclosure,
} from "@omnidev/sigil";
import { HiOutlineTrash } from "react-icons/hi2";

import { app } from "lib/config";

import type { ButtonProps, DialogProps } from "@omnidev/sigil";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";

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
  /** Trigger user input for deleting. */
  isTwoFactorDelete?: boolean;
  /** Children to render in the dialog content area. */
  children?: ReactNode;
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
  children,
  isTwoFactorDelete,
  ...rest
}: Props) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [inputValue, setInputValue] = useState("");

  // Define the confirmation text only if isTwoFactorDelete is true
  const confirmationText = isTwoFactorDelete ? "DELETE FOREVER" : null;

  const isDeleteDisabled = confirmationText
    ? inputValue !== confirmationText
    : false;

  const actions: Action[] = [
    {
      ...action,
      variant: "outline",
      disabled: isDeleteDisabled,
      onClick: (e) => {
        action.onClick?.(e);
        onClose();
      },
    },
    {
      label: app.actions.cancel.label,
      onClick: onClose,
    },
  ];

  return (
    <Dialog
      title={title}
      description={description}
      open={isOpen}
      onOpenChange={onToggle}
      trigger={
        <Button variant="icon" p={1} bgColor="transparent" {...triggerProps}>
          <Icon src={icon} w={5} h={5} />
        </Button>
      }
      triggerProps={triggerProps}
      {...rest}
    >
      {children}

      {isTwoFactorDelete && (
        <Stack gap={2}>
          <Label>{`Type "${confirmationText}" to confirm`}</Label>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            mb={4}
          />
        </Stack>
      )}

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

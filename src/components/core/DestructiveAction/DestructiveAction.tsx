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

import type {
  ButtonProps,
  DialogProps,
  IconProps,
  JsxStyleProps,
} from "@omnidev/sigil";
import type { ReactNode } from "react";
import type { IconType } from "react-icons";

const destructiveButtonStyles: JsxStyleProps = {
  color: "white",
  backgroundColor: {
    base: "red",
    _hover: { base: "destructive.hover", _disabled: "red" },
    _active: "destructive.active",
    _focus: "destructive.focus",
  },
  opacity: {
    _disabled: 0.5,
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
  /** Dynamic confirmation text for destructive actions. */
  destructiveInput?: string;
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
  destructiveInput,
  triggerLabel,
  ...rest
}: Props) => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const [inputValue, setInputValue] = useState("");

  const actions: Action[] = [
    {
      variant: "solid",
      ...destructiveButtonStyles,
      ...action,
      disabled: destructiveInput
        ? inputValue !== destructiveInput || action.disabled
        : action.disabled,
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

      {destructiveInput && (
        <Stack gap={2}>
          <Label>{`Type "${destructiveInput}" below to confirm`}</Label>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            borderColor={{ base: "border.default", _focus: "red" }}
            boxShadow={{ _focus: "0 0 0 1px red" }}
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

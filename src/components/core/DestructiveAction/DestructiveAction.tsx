"use client";

import {
  Button,
  Dialog,
  HStack,
  Icon,
  Input,
  Label,
  Stack,
  Text,
  useDisclosure,
} from "@omnidev/sigil";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { useIsClient } from "usehooks-ts";

import { token } from "generated/panda/tokens";
import { app } from "lib/config";
import { useViewportSize } from "lib/hooks";

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
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "destructive.focus",
    outlineOffset: "2px",
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

  const isClient = useIsClient();

  const isSmallViewport = useViewportSize({
    minWidth: token("breakpoints.sm"),
  });

  const actions: Action[] = [
    {
      variant: "solid",
      ...destructiveButtonStyles,
      ...action,
      tabIndex: 0,
      disabled: destructiveInput
        ? inputValue !== destructiveInput || action.disabled
        : action.disabled,
      onClick: (e) => {
        e.stopPropagation();
        action.onClick?.(e);
        onClose();
      },
    },
    {
      label: app.actions.cancel.label,
      tabIndex: 0,
      onClick: (e) => {
        e.stopPropagation();
        onClose();
      },
      variant: "outline",
    },
  ];

  if (!isClient) return null;

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
          <Icon src={icon} h={5} w={5} {...iconProps} />

          {triggerLabel && (
            <Text display={{ base: "none", sm: "inline-flex" }}>
              {triggerLabel}
            </Text>
          )}
        </Button>
      }
      triggerProps={triggerProps}
      contentProps={{
        // NB: `onClick` and `cursor` are to change behavior due to render of dialog being unknown. We do not want to propagate events.
        onClick: (e) => e.stopPropagation(),
        style: {
          // TODO: adjust minW upstream in Sigil for mobile viewports
          minWidth: isSmallViewport ? token("sizes.md") : "80%",
          cursor: "default",
        },
      }}
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
        {actions.map(({ label, onClick, ...rest }) => (
          <Button
            key={label}
            flex={1}
            onClick={(e) => {
              // ! NB: this will prevent actions from triggering other events (i.e. form submissions)
              e.preventDefault();
              onClick?.(e);
            }}
            {...rest}
          >
            {label}
          </Button>
        ))}
      </HStack>
    </Dialog>
  );
};

export default DestructiveAction;

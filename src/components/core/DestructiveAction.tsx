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
import { LuTrash2 } from "react-icons/lu";
import { useIsClient } from "usehooks-ts";

import { token } from "@/generated/panda/tokens";
import app from "@/lib/config/app.config";
import useViewportSize from "@/lib/hooks/useViewportSize";

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
    base: "destructive",
    _hover: { base: "destructive.hover", _disabled: "destructive" },
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

export interface DestructiveActionProps
  extends Omit<DialogProps, "triggerProps"> {
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
  /** Trigger button props. */
  triggerProps?: ButtonProps;
}

/**
 * Dialog for destructive actions.
 */
const DestructiveAction = ({
  title,
  description,
  action,
  icon = LuTrash2,
  triggerProps,
  iconProps,
  children,
  destructiveInput,
  triggerLabel,
  ...rest
}: DestructiveActionProps) => {
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
      contentProps={{
        // NB: `onClick` and `cursor` are to change behavior due to render of dialog being unknown. We do not want to propagate events.
        onClick: (e) => e.stopPropagation(),
        style: {
          width: isSmallViewport ? token("sizes.md") : "calc(100vw - 2rem)",
          maxWidth: token("sizes.lg"),
          cursor: "default",
          zIndex: 50,
        },
      }}
      {...rest}
    >
      {children}

      {destructiveInput && (
        <Stack gap={2}>
          <Label
            _selection={{
              backgroundColor: "primary",
            }}
          >
            {`Type "${destructiveInput}" below to confirm`}
          </Label>

          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            borderColor={{ base: "border.default", _focus: "primary" }}
            boxShadow={{ _focus: "0 0 0 1px token(colors.primary)" }}
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

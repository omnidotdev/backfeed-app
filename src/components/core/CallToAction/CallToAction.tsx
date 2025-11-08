"use client";

import { Button, Center, Tooltip } from "@omnidev/sigil";
import { useRouter } from "next/navigation";

import { useDialogStore } from "lib/hooks/store";

import type { ButtonVariant } from "generated/panda/recipes";
import type { ReactNode } from "react";
import type { DialogType } from "store";

export interface ActionButton {
  /** Button label. */
  label: string;
  /** Button icon. */
  icon?: ReactNode;
  /** URL path for navigation. */
  href?: string;
  /** Whether the button is disabled. */
  disabled?: boolean;
  /** Type of dialog to trigger. */
  dialogType?: DialogType;
  /** Tooltip text. */
  tooltip?: string;
  variant?: ButtonVariant["variant"];
}

interface Props {
  /** Call to action button props. */
  action: ActionButton;
}

/**
 * Call to action button component.
 */
const CallToAction = ({ action }: Props) => {
  const router = useRouter();

  const {
    label,
    icon,
    href,
    variant = "solid",
    disabled,
    dialogType,
    tooltip,
  } = action;

  const { setIsOpen } = useDialogStore({
    type: dialogType,
  });

  const handleAction = () => {
    if (href) {
      if (href.startsWith("https://")) {
        window.open(href, "_blank", "noopener,noreferrer");
      } else {
        router.push(href);
      }
      return;
    }

    if (dialogType) {
      setIsOpen(true);
    }
  };

  return (
    <Tooltip
      hasArrow={false}
      closeOnClick={false}
      closeOnPointerDown={false}
      trigger={
        <Button
          asChild
          size="sm"
          variant={variant}
          disabled={disabled}
          onClick={!disabled ? handleAction : undefined}
        >
          {/* NB: Wrap content in a single element (Center) to satisfy React.Children.only requirement for asChild rendering. */}
          <Center>
            {icon && icon}

            {label}
          </Center>
        </Button>
      }
      triggerProps={{
        style: { all: "unset" },
      }}
      contentProps={{
        display: !disabled || !tooltip ? "none" : undefined,
        zIndex: "foreground",
        fontSize: "sm",
      }}
    >
      {action.tooltip}
    </Tooltip>
  );
};

export default CallToAction;

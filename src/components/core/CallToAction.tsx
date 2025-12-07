import { Button, Center, Tooltip } from "@omnidev/sigil";
import { useNavigate } from "@tanstack/react-router";

import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";

import type { LinkOptions } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { ButtonVariant } from "@/generated/panda/recipes";

export interface ActionButton {
  /** Button label. */
  label: string;
  /** Button icon. */
  icon?: ReactNode;
  /** Options for navigation. */
  linkOptions?: LinkOptions;
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
  const navigate = useNavigate();

  const {
    label,
    icon,
    linkOptions,
    variant = "solid",
    disabled,
    dialogType = DialogType.Fallback,
    tooltip,
  } = action;

  const { setIsOpen } = useDialogStore({
    type: dialogType,
  });

  const handleAction = () => {
    if (linkOptions) {
      if (linkOptions.href?.startsWith("https://")) {
        window.open(linkOptions.href, "_blank", "noopener,noreferrer");
      } else {
        navigate({ to: linkOptions.to, params: linkOptions.params });
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

import { useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  TooltipContent,
  TooltipPositioner,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";

import type { LinkOptions } from "@tanstack/react-router";
import type { ComponentProps, ReactNode } from "react";

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
  variant?: ComponentProps<typeof Button>["variant"];
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
    <TooltipRoot>
      <TooltipTrigger asChild>
        <Button
          size="sm"
          variant={variant}
          disabled={disabled}
          onClick={!disabled ? handleAction : undefined}
        >
          {icon && icon}
          {label}
        </Button>
      </TooltipTrigger>

      {disabled && tooltip && (
        <TooltipPositioner>
          <TooltipContent className="text-sm">{action.tooltip}</TooltipContent>
        </TooltipPositioner>
      )}
    </TooltipRoot>
  );
};

export default CallToAction;

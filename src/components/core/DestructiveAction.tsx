import { Button } from "@omnidotdev/thornberry/button";
import { ConfirmDialog } from "@omnidotdev/thornberry/confirm-dialog";
import { useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import { useIsClient } from "usehooks-ts";

import app from "@/lib/config/app.config";
import cn from "@/lib/utils";

import type { ComponentProps } from "react";
import type { IconType } from "react-icons";

interface Action {
  /** Action label. */
  label: string;
  /** Action handler, run once the user confirms. */
  onClick: () => void;
}

export interface DestructiveActionProps {
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
  /** Dialog trigger button label. */
  triggerLabel?: string;
  /** Class applied to the trigger icon. */
  iconClassName?: string;
  /** Trigger button props. */
  triggerProps?: ComponentProps<typeof Button>;
}

/**
 * Dialog for destructive actions.
 */
const DestructiveAction = ({
  title,
  description,
  action,
  icon: Icon = LuTrash2,
  triggerProps,
  iconClassName,
  destructiveInput,
  triggerLabel,
}: DestructiveActionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const isClient = useIsClient();

  if (!isClient) return null;

  return (
    <>
      <Button
        type="button"
        variant="destructive"
        aria-haspopup="dialog"
        {...triggerProps}
        onClick={(e) => {
          triggerProps?.onClick?.(e);
          setIsOpen(true);
        }}
      >
        <Icon className={cn("size-5", iconClassName)} />

        {triggerLabel && (
          <span className="hidden sm:inline-flex">{triggerLabel}</span>
        )}
      </Button>

      {/* NB: React bubbles portal events through the component tree, so stop clicks inside the dialog from reaching a clickable parent (e.g. a feedback card) */}
      {/* biome-ignore lint/a11y/noStaticElementInteractions: event boundary only, renders no box */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: event boundary only, renders no box */}
      <span className="contents" onClick={(e) => e.stopPropagation()}>
        <ConfirmDialog
          open={isOpen}
          onOpenChange={setIsOpen}
          title={title}
          description={description}
          confirmLabel={action.label}
          cancelLabel={app.actions.cancel.label}
          confirmationText={destructiveInput}
          onConfirm={() => {
            action.onClick();
            setIsOpen(false);
          }}
        />
      </span>
    </>
  );
};

export default DestructiveAction;

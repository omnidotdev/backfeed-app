import { Portal } from "@ark-ui/react/portal";
import { useState } from "react";
import { LuTrash2 } from "react-icons/lu";
import { useIsClient } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import {
  DialogBackdrop,
  DialogContent,
  DialogDescription,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import app from "@/lib/config/app.config";
import cn from "@/lib/utils";

import type { ComponentProps, MouseEvent, ReactNode } from "react";
import type { IconType } from "react-icons";

interface Action {
  /** Action label. */
  label: string;
  /** Action handler. */
  onClick?: (e: MouseEvent) => void;
  /** Whether the action is disabled. */
  disabled?: boolean;
  /** Class applied to the action button. */
  className?: string;
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
  /** Children to render in the dialog content area. */
  children?: ReactNode;
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
  children,
  destructiveInput,
  triggerLabel,
}: DestructiveActionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const isClient = useIsClient();

  if (!isClient) return null;

  const isActionDisabled = destructiveInput
    ? inputValue !== destructiveInput || action.disabled
    : action.disabled;

  return (
    <DialogRoot open={isOpen} onOpenChange={({ open }) => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button type="button" variant="destructive" {...triggerProps}>
          <Icon className={cn("size-5", iconClassName)} />

          {triggerLabel && (
            <span className="hidden sm:inline-flex">{triggerLabel}</span>
          )}
        </Button>
      </DialogTrigger>

      <Portal>
        <DialogBackdrop />
        {/* NB: `onClick` stops propagation as the dialog is rendered in unknown context and we do not want to propagate events */}
        <DialogContent onClick={(e) => e.stopPropagation()}>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>

          {children}

          {destructiveInput && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="destructive-confirm"
                className="text-sm selection:bg-primary"
              >
                {`Type "${destructiveInput}" below to confirm`}
              </label>

              <Input
                id="destructive-confirm"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="mb-4 focus:border-primary"
              />
            </div>
          )}

          <div className="flex gap-2">
            <Button
              variant="destructive"
              className={cn("flex-1", action.className)}
              disabled={isActionDisabled}
              onClick={(e) => {
                // ! NB: this will prevent the action from triggering other events (i.e. form submissions)
                e.preventDefault();
                e.stopPropagation();
                action.onClick?.(e);
                setIsOpen(false);
              }}
            >
              {action.label}
            </Button>

            <Button
              variant="outline"
              className="flex-1"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              {app.actions.cancel.label}
            </Button>
          </div>
        </DialogContent>
      </Portal>
    </DialogRoot>
  );
};

export default DestructiveAction;

import { Dialog as ArkDialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";

import cn from "@/lib/utils";

import type { ComponentProps } from "react";

const SheetRoot = ArkDialog.Root;
const SheetTrigger = ArkDialog.Trigger;
const SheetCloseTrigger = ArkDialog.CloseTrigger;

interface SheetContentProps extends ComponentProps<typeof ArkDialog.Content> {
  /** Side the sheet slides in from. */
  side?: "left" | "right";
}

const SheetContent = ({
  className,
  children,
  side = "left",
  ...rest
}: SheetContentProps) => (
  <Portal>
    <ArkDialog.Backdrop className="data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 duration-200 data-[state=closed]:animate-out data-[state=open]:animate-in" />
    <ArkDialog.Positioner className="fixed inset-0 z-50">
      <ArkDialog.Content
        className={cn(
          "fixed inset-y-0 z-50 flex h-full w-3/4 flex-col gap-4 bg-background shadow-lg duration-300 data-[state=closed]:animate-out data-[state=open]:animate-in sm:max-w-sm",
          side === "left"
            ? "left-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left"
            : "right-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
          className,
        )}
        {...rest}
      >
        {children}
      </ArkDialog.Content>
    </ArkDialog.Positioner>
  </Portal>
);

export { SheetRoot, SheetTrigger, SheetContent, SheetCloseTrigger };

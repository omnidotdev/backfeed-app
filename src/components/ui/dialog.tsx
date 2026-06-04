import { Dialog as ArkDialog } from "@ark-ui/react";
import { X } from "lucide-react";

import cn from "@/lib/utils";

import type { ComponentProps } from "react";

const DialogRoot = ArkDialog.Root;

const DialogBackdrop = ({
  className,
  ...rest
}: ComponentProps<typeof ArkDialog.Backdrop>) => (
  <ArkDialog.Backdrop
    className={cn(
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in",
      className,
    )}
    {...rest}
  />
);

const DialogPositioner = ({
  className,
  ...rest
}: ComponentProps<typeof ArkDialog.Positioner>) => (
  <ArkDialog.Positioner
    className={cn(
      "fixed inset-0 z-50 flex items-center justify-center p-4",
      className,
    )}
    {...rest}
  />
);

const DialogContent = ({
  className,
  children,
  ...rest
}: ComponentProps<typeof ArkDialog.Content>) => (
  <DialogPositioner>
    <ArkDialog.Content
      className={cn(
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-bottom-1/2 data-[state=open]:slide-in-from-bottom-1/2 relative w-full max-w-lg rounded-xl border bg-background p-6 shadow-2xl data-[state=closed]:animate-out data-[state=open]:animate-in",
        className,
      )}
      {...rest}
    >
      {children}
    </ArkDialog.Content>
  </DialogPositioner>
);

const DialogCloseTrigger = ({
  className,
  ...rest
}: ComponentProps<typeof ArkDialog.CloseTrigger>) => (
  <ArkDialog.CloseTrigger
    className={cn(
      "absolute top-4 right-4 rounded-lg p-1.5 text-muted-foreground opacity-70 transition-all hover:bg-accent hover:text-accent-foreground hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
      className,
    )}
    {...rest}
  >
    <X className="size-4" />
    <span className="sr-only">Close</span>
  </ArkDialog.CloseTrigger>
);

const DialogTitle = ({
  className,
  ...rest
}: ComponentProps<typeof ArkDialog.Title>) => (
  <ArkDialog.Title
    className={cn(
      "mb-2 font-semibold text-foreground text-lg leading-none tracking-tight",
      className,
    )}
    {...rest}
  />
);

const DialogDescription = ({
  className,
  ...rest
}: ComponentProps<typeof ArkDialog.Description>) => (
  <ArkDialog.Description
    className={cn("mb-4 text-muted-foreground text-sm", className)}
    {...rest}
  />
);

export {
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogCloseTrigger,
  DialogTitle,
  DialogDescription,
};

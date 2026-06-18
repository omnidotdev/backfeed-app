import { Portal } from "@ark-ui/react/portal";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";

import {
  DialogBackdrop,
  DialogContent,
  DialogDescription,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
} from "@/components/ui/dialog";
import cn from "@/lib/utils";

import type { ComponentProps } from "react";

/**
 * Command menu primitives (cmdk) styled for Sigil/Tailwind. Compose a command
 * palette with {@link CommandDialog} (a ⌘K-style modal) or embed {@link Command}
 * inline. Apps feed their own command items, so the palette is reusable across
 * products.
 */
const Command = ({
  className,
  ...rest
}: ComponentProps<typeof CommandPrimitive>) => (
  <CommandPrimitive
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className,
    )}
    {...rest}
  />
);

interface CommandDialogProps extends ComponentProps<typeof DialogRoot> {
  /** Accessible title (visually hidden). */
  title?: string;
  /** Accessible description (visually hidden). */
  description?: string;
}

const CommandDialog = ({
  children,
  title = "Command Palette",
  description = "Search for a command to run",
  ...rest
}: CommandDialogProps) => (
  <DialogRoot {...rest}>
    <Portal>
      <DialogBackdrop />
      <DialogPositioner>
        <DialogContent className="overflow-hidden p-0 sm:max-w-lg">
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
          <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5">
            {children}
          </Command>
        </DialogContent>
      </DialogPositioner>
    </Portal>
  </DialogRoot>
);

const CommandInput = ({
  className,
  ...rest
}: ComponentProps<typeof CommandPrimitive.Input>) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <Search className="mr-2 size-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...rest}
    />
  </div>
);

const CommandList = ({
  className,
  ...rest
}: ComponentProps<typeof CommandPrimitive.List>) => (
  <CommandPrimitive.List
    className={cn(
      "max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden",
      className,
    )}
    {...rest}
  />
);

const CommandEmpty = (rest: ComponentProps<typeof CommandPrimitive.Empty>) => (
  <CommandPrimitive.Empty
    className="py-6 text-center text-muted-foreground text-sm"
    {...rest}
  />
);

const CommandGroup = ({
  className,
  ...rest
}: ComponentProps<typeof CommandPrimitive.Group>) => (
  <CommandPrimitive.Group
    className={cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs",
      className,
    )}
    {...rest}
  />
);

const CommandSeparator = ({
  className,
  ...rest
}: ComponentProps<typeof CommandPrimitive.Separator>) => (
  <CommandPrimitive.Separator
    className={cn("-mx-1 h-px bg-border", className)}
    {...rest}
  />
);

const CommandItem = ({
  className,
  ...rest
}: ComponentProps<typeof CommandPrimitive.Item>) => (
  <CommandPrimitive.Item
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-muted data-[selected=true]:text-foreground data-[disabled=true]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
      className,
    )}
    {...rest}
  />
);

/** A trailing shortcut hint inside a command item. */
const CommandShortcut = ({ className, ...rest }: ComponentProps<"span">) => (
  <span
    className={cn(
      "ml-auto text-muted-foreground text-xs tracking-widest",
      className,
    )}
    {...rest}
  />
);

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};

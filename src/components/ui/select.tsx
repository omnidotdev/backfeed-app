import { Portal } from "@ark-ui/react/portal";
import { Select as ArkSelect } from "@ark-ui/react/select";
import { ChevronDown } from "lucide-react";

import cn from "@/lib/utils";

import type { ComponentProps } from "react";

const SelectRoot = ArkSelect.Root;

const SelectControl = ({
  className,
  ...rest
}: ComponentProps<typeof ArkSelect.Control>) => (
  <ArkSelect.Control className={cn("relative", className)} {...rest} />
);

const SelectTrigger = ({
  className,
  ...rest
}: ComponentProps<typeof ArkSelect.Trigger>) => (
  <ArkSelect.Trigger
    className={cn(
      "inline-flex h-9 cursor-pointer items-center justify-between gap-2 rounded-md border border-input bg-background px-3 text-foreground text-sm shadow-xs outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...rest}
  />
);

const SelectValueText = ({
  className,
  ...rest
}: ComponentProps<typeof ArkSelect.ValueText>) => (
  <ArkSelect.ValueText className={cn("truncate", className)} {...rest} />
);

const SelectIndicator = ({
  className,
  ...rest
}: ComponentProps<typeof ArkSelect.Indicator>) => (
  <ArkSelect.Indicator className={className} {...rest}>
    <ChevronDown className="size-4 text-muted-foreground" />
  </ArkSelect.Indicator>
);

const SelectPositioner = ({
  className,
  ...rest
}: ComponentProps<typeof ArkSelect.Positioner>) => (
  <ArkSelect.Positioner className={className} {...rest} />
);

const SelectContent = ({
  className,
  ...rest
}: ComponentProps<typeof ArkSelect.Content>) => (
  <ArkSelect.Content
    className={cn(
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-50 flex min-w-32 origin-(--transform-origin) flex-col gap-0.5 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none data-[state=closed]:animate-out data-[state=open]:animate-in",
      className,
    )}
    {...rest}
  />
);

const SelectItem = ({
  className,
  children,
  ...rest
}: ComponentProps<typeof ArkSelect.Item>) => (
  <ArkSelect.Item
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden hover:bg-accent focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-50",
      className,
    )}
    {...rest}
  >
    {children}
  </ArkSelect.Item>
);

const SelectItemText = ({
  className,
  ...rest
}: ComponentProps<typeof ArkSelect.ItemText>) => (
  <ArkSelect.ItemText className={className} {...rest} />
);

export {
  SelectContent,
  SelectControl,
  SelectIndicator,
  SelectItem,
  SelectItemText,
  SelectPositioner,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Portal as SelectPortal,
};

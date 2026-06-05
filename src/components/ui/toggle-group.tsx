import { ToggleGroup as ArkToggleGroup } from "@ark-ui/react/toggle-group";

import cn from "@/lib/utils";

import type { ComponentProps } from "react";

const ToggleGroupRoot = ({
  className,
  ...rest
}: ComponentProps<typeof ArkToggleGroup.Root>) => (
  <ArkToggleGroup.Root
    className={cn("inline-flex items-center gap-1", className)}
    {...rest}
  />
);

const ToggleGroupItem = ({
  className,
  ...rest
}: ComponentProps<typeof ArkToggleGroup.Item>) => (
  <ArkToggleGroup.Item
    className={cn(
      "inline-flex cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-background-emphasized data-[state=on]:text-foreground",
      className,
    )}
    {...rest}
  />
);

export { ToggleGroupItem, ToggleGroupRoot };

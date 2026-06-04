import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/react/segment-group";

import cn from "@/lib/utils";

import type { ComponentProps } from "react";

const SegmentGroupRoot = ({
  className,
  ...rest
}: ComponentProps<typeof ArkSegmentGroup.Root>) => (
  <ArkSegmentGroup.Root
    className={cn(
      "inline-flex items-center rounded-lg border border-border bg-muted p-0.5",
      className,
    )}
    {...rest}
  />
);

const SegmentGroupItem = ({
  className,
  ...rest
}: ComponentProps<typeof ArkSegmentGroup.Item>) => (
  <ArkSegmentGroup.Item
    className={cn(
      "relative cursor-pointer rounded-md px-3 py-1 text-muted-foreground text-sm transition-colors hover:text-foreground data-[state=checked]:bg-background data-[state=checked]:text-foreground data-[state=checked]:shadow-sm",
      className,
    )}
    {...rest}
  />
);

const SegmentGroupItemText = ArkSegmentGroup.ItemText;
const SegmentGroupItemHiddenInput = ArkSegmentGroup.ItemHiddenInput;

export {
  SegmentGroupItem,
  SegmentGroupItemHiddenInput,
  SegmentGroupItemText,
  SegmentGroupRoot,
};

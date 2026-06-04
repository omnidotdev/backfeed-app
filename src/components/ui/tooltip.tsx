import { Tooltip as ArkTooltip } from "@ark-ui/react/tooltip";

import cn from "@/lib/utils";

import type { ComponentProps } from "react";

const TooltipRoot = ArkTooltip.Root;

const TooltipTrigger = ({
  className,
  ...rest
}: ComponentProps<typeof ArkTooltip.Trigger>) => (
  <ArkTooltip.Trigger className={className} {...rest} />
);

const TooltipPositioner = ({
  className,
  ...rest
}: ComponentProps<typeof ArkTooltip.Positioner>) => (
  <ArkTooltip.Positioner className={className} {...rest} />
);

const TooltipContent = ({
  className,
  ...rest
}: ComponentProps<typeof ArkTooltip.Content>) => (
  <ArkTooltip.Content
    className={cn(
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 z-50 rounded-md bg-popover px-2.5 py-1.5 text-popover-foreground text-xs shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in",
      className,
    )}
    {...rest}
  />
);

export { TooltipContent, TooltipPositioner, TooltipRoot, TooltipTrigger };

import { Portal } from "@ark-ui/react/portal";
import { useState } from "react";

import {
  TooltipContent,
  TooltipPositioner,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import type { ComponentProps, ReactNode } from "react";

interface Props extends ComponentProps<typeof TooltipRoot> {
  /** Tooltip trigger element. */
  trigger: ReactNode;
  /** Tooltip content. */
  children: ReactNode;
  /** Props passed to the tooltip trigger. */
  triggerProps?: ComponentProps<typeof TooltipTrigger>;
}

/**
 * Tooltip component that allows tooltip content to be displayed on hover or click.
 */
const Tooltip = ({ trigger, children, triggerProps, ...rest }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipRoot
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
      openDelay={0}
      closeDelay={0}
      {...rest}
    >
      <TooltipTrigger
        asChild
        // TODO: figure out how to handle conflict with `triggerProps.onClick` when using touch device.
        onClick={() => setIsOpen((open) => !open)}
        {...triggerProps}
      >
        {trigger}
      </TooltipTrigger>

      <Portal>
        <TooltipPositioner>
          <TooltipContent>{children}</TooltipContent>
        </TooltipPositioner>
      </Portal>
    </TooltipRoot>
  );
};

export default Tooltip;

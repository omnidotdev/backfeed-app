"use client";

import { Tooltip as SigilTooltip, useDisclosure } from "@omnidev/sigil";

import type { TooltipProps } from "@omnidev/sigil";

/**
 * Tooltip component that allows tooltip content to be displayed on hover or click.
 */
const Tooltip = ({ triggerProps, ...rest }: TooltipProps) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <SigilTooltip
      open={isOpen}
      // TODO: figure out how to handle conflict with `triggerProps.onClick` when using touch device.
      onOpenChange={onToggle}
      triggerProps={{
        onClick: onToggle,
        ...triggerProps,
      }}
      {...rest}
    />
  );
};

export default Tooltip;

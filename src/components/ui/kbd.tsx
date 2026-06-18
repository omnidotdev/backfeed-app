import cn from "@/lib/utils";

import type { ComponentProps } from "react";

/**
 * Keyboard-shortcut hint. Renders a `<kbd>` chip used to surface a shortcut next
 * to an action (e.g. a "C" badge on a Create button, or in a tooltip/menu).
 */
const Kbd = ({ className, ...rest }: ComponentProps<"kbd">) => (
  <kbd
    data-slot="kbd"
    className={cn(
      "pointer-events-none inline-flex h-5 w-fit min-w-5 select-none items-center justify-center gap-0.5 rounded border bg-muted px-1 font-medium font-sans text-[0.625rem] text-muted-foreground uppercase leading-none",
      className,
    )}
    {...rest}
  />
);

export { Kbd };

import cn from "@/lib/utils";

import type { ComponentProps } from "react";

const Label = ({ className, ...rest }: ComponentProps<"label">) => (
  // biome-ignore lint/a11y/noLabelWithoutControl: generic label primitive associated via htmlFor at call sites
  <label
    className={cn(
      "font-medium text-foreground text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    )}
    {...rest}
  />
);

export { Label };

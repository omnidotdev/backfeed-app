import cn from "@/lib/utils";

import type { ComponentProps } from "react";

/**
 * Gradient mask component. Used to provide a fade-out effect for scrollable containers.
 */
const GradientMask = ({ className, ...rest }: ComponentProps<"div">) => (
  <div
    className={cn(
      "pointer-events-none absolute h-24 w-full bg-gradient-to-b from-transparent from-[5%] to-background",
      className,
    )}
    {...rest}
  />
);

export default GradientMask;

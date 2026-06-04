import cn from "@/lib/utils";

import type { ComponentProps } from "react";

/**
 * Overflow text component. Used to truncate text that is too long.
 */
const OverflowText = ({ className, ...rest }: ComponentProps<"span">) => (
  <span className={cn("overflow-hidden text-ellipsis", className)} {...rest} />
);

export default OverflowText;

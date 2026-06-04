import cn from "@/lib/utils";

import type { ComponentProps } from "react";

const Skeleton = ({ className, ...rest }: ComponentProps<"div">) => (
  <div
    className={cn("animate-pulse rounded-md bg-muted", className)}
    {...rest}
  />
);

export { Skeleton };

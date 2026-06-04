import { ark } from "@ark-ui/react";

import cn from "@/lib/utils";

import type { ComponentProps } from "react";

const Input = ({ className, ...rest }: ComponentProps<typeof ark.input>) => (
  <ark.input
    className={cn(
      "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      className,
    )}
    {...rest}
  />
);

export { Input };

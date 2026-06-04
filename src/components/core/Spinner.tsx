import { forwardRef } from "react";

import cn from "@/lib/utils";

import type { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  /**
   * For accessibility, it is important to add a fallback loading text.
   * This text will be visible to screen readers.
   * @default "Loading..."
   */
  label?: string;
}

/**
 * Spinner component. Used to indicate loading state.
 */
const Spinner = forwardRef<HTMLDivElement, Props>(
  ({ label = "Loading...", className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        "size-6 animate-spin rounded-full border-2 border-foreground-subtle border-b-transparent [animation-duration:1.4s]",
        className,
      )}
      {...rest}
    >
      <span className="sr-only">{label}</span>
    </div>
  ),
);

Spinner.displayName = "Spinner";

export default Spinner;

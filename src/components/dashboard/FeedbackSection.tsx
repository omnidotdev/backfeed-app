import { forwardRef } from "react";

import cn from "@/lib/utils";

import type { ComponentProps } from "react";

interface Props extends ComponentProps<"div"> {
  /** Section title. */
  title: string;
  /** Class names for the scrollable content container. */
  contentClassName?: string;
}

/**
 * Feedback section.
 */
const FeedbackSection = forwardRef<HTMLDivElement, Props>(
  ({ title, children, contentClassName, className, ...rest }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-background",
        className,
      )}
      {...rest}
    >
      <p className="w-full border-border-subtle border-b px-5 py-4 font-semibold text-foreground text-sm">
        {title}
      </p>

      <div className={cn("flex flex-col overflow-auto", contentClassName)}>
        {children}
      </div>
    </div>
  ),
);

FeedbackSection.displayName = "FeedbackSection";

export default FeedbackSection;

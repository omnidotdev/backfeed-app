import { forwardRef } from "react";

import cn from "@/lib/utils";

import type { ComponentProps, ReactNode } from "react";
import type { IconType } from "react-icons";

interface Props extends ComponentProps<"div"> {
  /** Container title */
  title?: string;
  /** Container description */
  description?: string;
  /** Visual icon */
  icon?: IconType;
  /** Additional class names for the title container. */
  titleClassName?: string;
  /** Additional class names for the description. */
  descriptionClassName?: string;
  /** Header actions. */
  headerActions?: ReactNode;
}

/**
 * Section container.
 */
const SectionContainer = forwardRef<HTMLDivElement, Props>(
  (
    {
      title,
      description,
      children,
      icon: Icon,
      titleClassName,
      descriptionClassName,
      headerActions,
      className,
      ...rest
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "relative flex flex-col gap-6 overflow-visible rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6 dark:border-neutral-800 dark:bg-neutral-900",
        className,
      )}
      {...rest}
    >
      {(title || headerActions || description) && (
        <div className="flex flex-col gap-1">
          <div className={cn("flex items-center gap-2", titleClassName)}>
            {Icon && <Icon className="size-5 text-foreground-subtle" />}

            {title && (
              <p className="font-semibold text-xl leading-[1.2] lg:text-2xl">
                {title}
              </p>
            )}

            {headerActions && headerActions}
          </div>

          {description && (
            <p
              className={cn(
                "text-foreground-subtle text-xs lg:text-sm",
                descriptionClassName,
              )}
            >
              {description}
            </p>
          )}
        </div>
      )}

      {children}
    </div>
  ),
);

SectionContainer.displayName = "SectionContainer";

export default SectionContainer;

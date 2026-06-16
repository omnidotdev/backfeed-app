import { Skeleton } from "@/components/ui/skeleton";
import cn from "@/lib/utils";

import type { ComponentProps } from "react";
import type { IconType } from "react-icons";

interface Props extends ComponentProps<"div"> {
  /** Statistic title (human-readable label). */
  title: string;
  /** Statistic value. */
  value: string | number;
  /** Visual icon. */
  icon: IconType;
  /** Accent color for the icon chip. */
  accentColor?: "amber" | "emerald" | "sky";
  /** Whether the statistic data is loaded. */
  isLoaded?: boolean;
  /** Whether loading the statistic data encountered an error. */
  isError?: boolean;
}

const accentStyles = {
  amber: {
    bg: "bg-amber-100 dark:bg-amber-500/15",
    icon: "text-amber-600 dark:text-amber-400",
  },
  emerald: {
    bg: "bg-emerald-100 dark:bg-emerald-500/15",
    icon: "text-emerald-600 dark:text-emerald-400",
  },
  sky: {
    bg: "bg-sky-100 dark:bg-sky-500/15",
    icon: "text-sky-600 dark:text-sky-400",
  },
};

/**
 * Aggregate statistic. A single compact, inline KPI segment (filled icon chip +
 * value + label), designed to sit alongside others in a divided stat strip
 * (e.g. total feedback, active users, total engagement).
 */
const Aggregate = ({
  title,
  value,
  icon: Icon,
  accentColor,
  isLoaded = true,
  isError = false,
  className,
  ...rest
}: Props) => {
  const accent = accentColor ? accentStyles[accentColor] : null;

  return (
    <div
      className={cn(
        "flex items-center gap-2.5 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3",
        className,
      )}
      {...rest}
    >
      <div
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg sm:size-9",
          accent ? accent.bg : "bg-background-subtle",
        )}
      >
        <Icon
          className={cn(
            "size-4 sm:size-[1.125rem]",
            accent ? accent.icon : "text-foreground-subtle",
          )}
        />
      </div>

      <div className="flex min-w-0 flex-col">
        {isLoaded ? (
          <span className="font-bold text-base leading-tight tracking-tight tabular-nums sm:text-xl">
            {isError ? "—" : value}
          </span>
        ) : (
          <Skeleton className="h-6 w-12" />
        )}

        <span className="truncate font-medium text-[0.6875rem] text-foreground-subtle leading-tight sm:text-xs">
          {title}
        </span>
      </div>
    </div>
  );
};

export default Aggregate;

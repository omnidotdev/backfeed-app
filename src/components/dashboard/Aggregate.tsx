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
  /** Accent color for the icon background. */
  accentColor?: "amber" | "emerald" | "sky";
  /** Whether the statistic data is loaded. */
  isLoaded?: boolean;
  /** Whether loading the statistic data encountered an error. */
  isError?: boolean;
}

const accentStyles = {
  amber: {
    bg: "bg-amber-100 dark:bg-neutral-800",
    icon: "text-amber-600 dark:text-amber-700",
  },
  emerald: {
    bg: "bg-emerald-100 dark:bg-neutral-800",
    icon: "text-emerald-600 dark:text-emerald-700",
  },
  sky: {
    bg: "bg-sky-100 dark:bg-neutral-800",
    icon: "text-sky-600 dark:text-sky-700",
  },
};

/**
 * Aggregate statistic card. Displays KPI information such as total feedback, active users, or average response time.
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
        "flex flex-col gap-1.5 rounded-xl border border-border-subtle bg-background p-3 sm:gap-2 sm:p-5",
        className,
      )}
      {...rest}
    >
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-lg sm:size-8",
            accent ? accent.bg : "bg-background-subtle",
          )}
        >
          <Icon
            className={cn(
              "size-3.5 sm:size-4",
              accent ? accent.icon : "text-foreground-subtle",
            )}
          />
        </div>

        <span className="font-medium text-foreground-subtle text-xs leading-tight sm:text-sm">
          {title}
        </span>
      </div>

      {isLoaded ? (
        <p className="font-bold text-xl leading-none tracking-tight sm:text-3xl">
          {isError ? "—" : value}
        </p>
      ) : (
        <Skeleton className="h-9 w-24" />
      )}
    </div>
  );
};

export default Aggregate;

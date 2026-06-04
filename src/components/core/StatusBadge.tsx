import Color from "colorjs.io";

import cn from "@/lib/utils";

import type { ComponentProps } from "react";
import type { StatusTemplate } from "@/generated/graphql";

interface Props extends ComponentProps<"div"> {
  /** The status template for the post. */
  status: Partial<StatusTemplate> | null;
}

/**
 * Get background color with opacity from status color.
 */
const getBackgroundColor = (
  color: string | null | undefined,
): string | undefined => {
  if (!color) return undefined;
  try {
    const parsed = new Color(color);
    parsed.alpha = 0.15;
    return parsed.toString({ format: "rgba" });
  } catch {
    return undefined;
  }
};

/*
 * Badge representing the status for feedback.
 */
const StatusBadge = ({ status, children, className, ...rest }: Props) => {
  const bgColor = getBackgroundColor(status?.color);

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full px-2.5 py-1",
        className,
      )}
      style={{
        backgroundColor: bgColor,
        color: status?.color ?? undefined,
      }}
      {...rest}
    >
      <span className="whitespace-nowrap font-medium text-xs">
        {status?.displayName ?? "Unknown"}
      </span>

      {children}
    </div>
  );
};

export default StatusBadge;

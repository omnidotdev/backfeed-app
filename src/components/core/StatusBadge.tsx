import {
  getStatusBackgroundColor,
  statusTextColorClassName,
  statusTextColorStyle,
} from "@/lib/util/statusColors";
import cn from "@/lib/utils";

import type { CSSProperties, ComponentProps } from "react";
import type { StatusTemplate } from "@/generated/graphql";

interface Props extends ComponentProps<"div"> {
  /** The status template for the post. */
  status: Partial<StatusTemplate> | null;
}

/*
 * Badge representing the status for feedback.
 */
const StatusBadge = ({
  status,
  children,
  className,
  style,
  ...rest
}: Props) => {
  const bgColor = getStatusBackgroundColor(status?.color);

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full px-2.5 py-1",
        statusTextColorClassName,
        className,
      )}
      style={
        {
          backgroundColor: bgColor,
          ...statusTextColorStyle(status?.color),
          ...style,
        } as CSSProperties
      }
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

import cn from "@/lib/utils";

import type { ComponentProps } from "react";

interface Props extends Omit<ComponentProps<"span">, "color"> {
  /** Tag display name */
  name: string;
  /** Tag color (hex), used for the dot and subtle background tint */
  color?: string | null;
}

/** Default chip color when a tag has no color set. */
const DEFAULT_COLOR = "#94a3b8";

/**
 * Tag badge. Renders a small label chip with a colored dot, GitHub-issue-style.
 */
const TagBadge = ({ name, color, className, ...rest }: Props) => {
  const dotColor = color || DEFAULT_COLOR;

  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2 py-0.5 font-medium text-foreground text-xs",
        className,
      )}
      style={{
        borderColor: `${dotColor}66`,
        backgroundColor: `${dotColor}14`,
      }}
      {...rest}
    >
      <span
        aria-hidden
        className="size-2 shrink-0 rounded-full"
        style={{ backgroundColor: dotColor }}
      />
      {name}
    </span>
  );
};

export default TagBadge;

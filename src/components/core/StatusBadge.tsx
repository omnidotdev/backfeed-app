import Color from "colorjs.io";

import cn from "@/lib/utils";

import type { CSSProperties, ComponentProps } from "react";
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

/**
 * Adjust a status color's lightness so the label stays legible against the
 * translucent badge over the active theme background. Dark statuses (e.g.
 * completed/closed) are unreadable as-is on the dark theme, so both a
 * light-theme and dark-theme text color are derived and selected via CSS.
 */
const getTextColor = (
  color: string | null | undefined,
  { dark }: { dark: boolean },
): string | undefined => {
  if (!color) return undefined;
  try {
    const parsed = new Color(color);
    const lightness = parsed.get("oklch.l");
    // clamp toward light on dark backgrounds, toward dark on light backgrounds
    parsed.set(
      "oklch.l",
      dark ? Math.max(lightness, 0.75) : Math.min(lightness, 0.5),
    );
    return parsed.to("srgb").toString({ format: "hex" });
  } catch {
    return undefined;
  }
};

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
  const bgColor = getBackgroundColor(status?.color);
  const lightText = getTextColor(status?.color, { dark: false });
  const darkText = getTextColor(status?.color, { dark: true });

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full px-2.5 py-1 text-[var(--sb-fg-light)] dark:text-[var(--sb-fg-dark)]",
        className,
      )}
      style={
        {
          backgroundColor: bgColor,
          "--sb-fg-light": lightText,
          "--sb-fg-dark": darkText,
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

import Color from "colorjs.io";

import type { CSSProperties } from "react";

/**
 * Translucent background derived from a status color, so a badge or pill tints
 * the surface without overpowering it.
 */
export const getStatusBackgroundColor = (
  color: string | null | undefined,
  opacity = 0.15,
): string | undefined => {
  if (!color) return undefined;
  try {
    const parsed = new Color(color);
    parsed.alpha = opacity;
    return parsed.toString({ format: "rgba" });
  } catch {
    return undefined;
  }
};

/**
 * Clamp a status color's lightness for a single theme so the label stays
 * legible against that theme's background. Dark statuses (e.g. completed/closed)
 * are unreadable as-is on the dark theme, and pale statuses wash out on the
 * light theme, so each theme gets its own clamped color.
 */
const clampLightness = (color: string, { dark }: { dark: boolean }): string => {
  const parsed = new Color(color);
  const lightness = parsed.get("oklch.l");
  parsed.set(
    "oklch.l",
    dark ? Math.max(lightness, 0.75) : Math.min(lightness, 0.5),
  );
  return parsed.to("srgb").toString({ format: "hex" });
};

/**
 * Derive both a light-theme and dark-theme text color from a status color.
 * Consumers apply them via CSS custom properties and switch with the `dark`
 * class (see `statusTextColorClassName`), so no runtime theme read is needed.
 */
export const getStatusTextColors = (
  color: string | null | undefined,
): { light?: string; dark?: string } => {
  if (!color) return {};
  try {
    return {
      light: clampLightness(color, { dark: false }),
      dark: clampLightness(color, { dark: true }),
    };
  } catch {
    return {};
  }
};

/** CSS custom-property names carrying the theme-aware status text colors. */
export const STATUS_TEXT_VARS = {
  light: "--status-fg-light",
  dark: "--status-fg-dark",
} as const;

/**
 * Tailwind classes that select the correct status text color for the active
 * theme, reading the custom properties set by `statusTextColorStyle`.
 */
export const statusTextColorClassName =
  "text-[var(--status-fg-light)] dark:text-[var(--status-fg-dark)]";

/**
 * Inline style wiring a status color into the theme-aware text-color custom
 * properties. Pair with `statusTextColorClassName` on the same element.
 */
export const statusTextColorStyle = (
  color: string | null | undefined,
): CSSProperties => {
  const { light, dark } = getStatusTextColors(color);
  const style: Record<string, string> = {};
  if (light) style[STATUS_TEXT_VARS.light] = light;
  if (dark) style[STATUS_TEXT_VARS.dark] = dark;
  return style as CSSProperties;
};

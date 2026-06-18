/**
 * Keyboard shortcuts, mapped to react-hotkeys-hook key strings. Surfaced in the
 * UI via the `Kbd` hint chip and the command palette so the app is discoverable
 * and keyboard-driven.
 */
export enum Hotkeys {
  /** Open the command palette. */
  CommandPalette = "mod+k",
  /** Create a feedback post (on a project board). */
  CreatePost = "c",
  /** Create a project. */
  CreateProject = "mod+p",
  /** Toggle the color theme. */
  ToggleTheme = "t",
}

/** Human-facing label for a hotkey, for `Kbd` hints (e.g. "⌘K", "C"). */
export const hotkeyLabel = (hotkey: Hotkeys): string =>
  hotkey
    .replace(/\bmod\b/g, "⌘")
    .split("+")
    .map((part) => (part.length === 1 ? part.toUpperCase() : part))
    .join("");

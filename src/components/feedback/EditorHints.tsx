import { LuInfo } from "react-icons/lu";

import Tooltip from "@/components/core/Tooltip";

/** Typeahead triggers surfaced beside a rich-text composer. */
const HINTS: { trigger: string; description: string }[] = [
  { trigger: "@", description: "mention a user" },
  { trigger: "#", description: "reference a post" },
];

/**
 * Small tip affordance shown beside a rich-text composer, surfacing the
 * editor's typeahead triggers (mirrors GitHub's input hints). Hover or tap the
 * icon to reveal what `@` and `#` do, plus that markdown is supported.
 */
const EditorHints = () => (
  <Tooltip
    trigger={
      <button
        type="button"
        aria-label="Formatting hints"
        className="inline-flex items-center text-foreground-subtle transition-colors hover:text-foreground"
      >
        <LuInfo className="size-4" />
      </button>
    }
  >
    <ul className="flex flex-col gap-1">
      {HINTS.map((hint) => (
        <li key={hint.trigger} className="flex items-center gap-1.5">
          <span className="text-foreground-subtle">Type</span>
          <kbd className="rounded border border-border-subtle bg-background-subtle px-1 font-mono text-xs">
            {hint.trigger}
          </kbd>
          <span className="text-foreground-subtle">to {hint.description}</span>
        </li>
      ))}
      <li className="text-foreground-subtle">Markdown supported</li>
    </ul>
  </Tooltip>
);

export default EditorHints;

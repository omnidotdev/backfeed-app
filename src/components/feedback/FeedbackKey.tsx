import { LuCopy } from "react-icons/lu";

import { buildFeedbackDisplayKey } from "@/lib/util/feedbackUrl";
import toaster from "@/lib/util/toaster";
import cn from "@/lib/utils";

interface Props {
  /** Project prefix (e.g. `API`), used to build the `API-42` key. */
  prefix?: string | null;
  /** Per-project sequential post number (absent for optimistic posts). */
  number?: number | null;
  className?: string;
}

/**
 * Copyable post key chip (e.g. `API-42`). The key is the canonical token for
 * referencing a post across projects and products.
 */
const FeedbackKey = ({ prefix, number, className }: Props) => {
  if (number == null) return null;

  const key = buildFeedbackDisplayKey({ prefix, number });

  const copy = async (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      await navigator.clipboard.writeText(key);
      toaster.success({
        title: "Copied",
        description: `${key} copied to clipboard`,
      });
    } catch {
      // clipboard unavailable (e.g. insecure context); ignore silently
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      title={`Copy ${key}`}
      className={cn(
        "inline-flex items-center gap-1 font-mono transition-colors hover:text-foreground",
        className,
      )}
    >
      <LuCopy className="size-3" />
      {key}
    </button>
  );
};

export default FeedbackKey;

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { LuGitCommitHorizontal } from "react-icons/lu";

import { statusTimelineOptions } from "@/lib/options/statusTimeline";

interface Props {
  /** Post rowId whose status timeline is shown. */
  postId: string;
}

/**
 * Status timeline. A compact, read-only log of a post's status transitions
 * (GitHub-issue style): who moved it to which status, and when. Renders nothing
 * until the post has at least one recorded change.
 */
const StatusTimeline = ({ postId }: Props) => {
  const { data: changes } = useQuery(statusTimelineOptions(postId));

  if (!changes?.length) return null;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-medium text-foreground-subtle text-xs uppercase tracking-wide">
        Status history
      </h2>

      <ol className="flex flex-col gap-3">
        {changes.map((change) => (
          <li key={change.rowId} className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-sm">
              <LuGitCommitHorizontal className="size-4 shrink-0 text-foreground-subtle" />

              <span className="text-muted-foreground">
                {change.changedBy?.username ?? "Someone"} moved this to
              </span>

              <span className="inline-flex items-center gap-1.5">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      change.toStatusTemplate?.color ??
                      "var(--colors-neutral-400)",
                  }}
                />
                <span className="font-medium">
                  {change.toStatusTemplate?.displayName ?? "No status"}
                </span>
              </span>

              <span className="text-foreground-subtle text-xs">
                {dayjs(change.createdAt).fromNow()}
              </span>
            </div>

            {change.note ? (
              // align the note under the text, past the commit icon
              <p className="ml-6 border-border border-l-2 pl-3 text-muted-foreground text-sm">
                {change.note}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    </section>
  );
};

export default StatusTimeline;

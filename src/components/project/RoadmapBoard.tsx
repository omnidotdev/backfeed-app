import FeedbackCard from "@/components/feedback/FeedbackCard";

import type { ComponentProps } from "react";
import type { FeedbackFragment } from "@/generated/graphql";

interface RoadmapStatus {
  rowId: string | undefined;
  displayName: string | null | undefined;
  color: string | null | undefined;
}

interface Props {
  /** Loaded posts to group into columns. */
  posts: FeedbackFragment[];
  /** Project statuses, in display order, one column each. */
  statuses: RoadmapStatus[];
  /** Whether the viewer can manage feedback (passed to the cards). */
  canManageFeedback: boolean;
  /** Status options for the card status menu. */
  projectStatuses?: ComponentProps<typeof FeedbackCard>["projectStatuses"];
  /** Navigate to a post when its card is clicked. */
  onSelectPost: (post: FeedbackFragment) => void;
}

/**
 * Roadmap board. Groups the project's feedback into read-only columns by status
 * (vote-ranked within each, inherited from the feed sort), giving a public
 * "what we're building" view. Read-only: it presents Backfeed's own posts +
 * statuses + votes, it is not a task board (that stays in Runa).
 */
const RoadmapBoard = ({
  posts,
  statuses,
  canManageFeedback,
  projectStatuses,
  onSelectPost,
}: Props) => {
  const columns = statuses.map((status) => ({
    status,
    posts: posts.filter((post) => post.statusTemplate?.rowId === status.rowId),
  }));

  return (
    <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-4">
      {columns.map(({ status, posts: columnPosts }) => (
        <div
          key={status.rowId ?? status.displayName}
          className="flex w-72 shrink-0 flex-col gap-3"
        >
          <div className="flex items-center justify-between gap-2 border-border-subtle border-b pb-2">
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: status.color ?? "var(--colors-neutral-400)",
                }}
              />
              <span className="truncate font-medium text-sm">
                {status.displayName ?? "Unknown"}
              </span>
            </div>
            <span className="shrink-0 rounded-full bg-background-subtle px-2 py-0.5 text-foreground-subtle text-xs tabular-nums">
              {columnPosts.length}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {columnPosts.length ? (
              columnPosts.map((post) => (
                <FeedbackCard
                  key={post.rowId}
                  feedback={post}
                  canManageFeedback={canManageFeedback}
                  projectStatuses={projectStatuses}
                  className="bg-[var(--colors-card-item)]"
                  titleProps={{ className: "line-clamp-2 overflow-hidden" }}
                  descriptionProps={{
                    className: "line-clamp-2 overflow-hidden",
                  }}
                  onClick={() => onSelectPost(post)}
                />
              ))
            ) : (
              <p className="rounded-lg border border-border-subtle border-dashed px-3 py-6 text-center text-foreground-subtle text-xs">
                No feedback
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoadmapBoard;

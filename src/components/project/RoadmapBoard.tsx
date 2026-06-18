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
    <div className="-mx-1 flex flex-col gap-4 px-1 pb-4 sm:flex-row sm:items-start sm:gap-4 sm:overflow-x-auto">
      {columns.map(({ status, posts: columnPosts }) => (
        <div
          key={status.rowId ?? status.displayName}
          className="flex w-full flex-col rounded-xl border border-border-subtle bg-[var(--colors-background-subtle)] sm:w-80 sm:shrink-0"
        >
          <div className="flex items-center justify-between gap-2 px-3 py-2.5">
            <div className="flex min-w-0 items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: status.color ?? "var(--colors-neutral-400)",
                }}
              />
              <span className="truncate font-semibold text-foreground text-sm">
                {status.displayName ?? "Unknown"}
              </span>
            </div>
            <span className="shrink-0 rounded-full bg-[var(--colors-card-item)] px-2 py-0.5 font-medium text-foreground-subtle text-xs tabular-nums">
              {columnPosts.length}
            </span>
          </div>

          <div className="flex flex-col gap-2 px-2 pb-2">
            {columnPosts.length ? (
              columnPosts.map((post) => (
                <FeedbackCard
                  key={post.rowId}
                  feedback={post}
                  canManageFeedback={canManageFeedback}
                  projectStatuses={projectStatuses}
                  hideStatus
                  className="border border-border-subtle bg-[var(--colors-card-item)] p-3"
                  titleProps={{ className: "line-clamp-2 overflow-hidden" }}
                  descriptionProps={{
                    className: "line-clamp-2 overflow-hidden",
                  }}
                  onClick={() => onSelectPost(post)}
                />
              ))
            ) : (
              <p className="rounded-lg border border-border-subtle border-dashed px-3 py-8 text-center text-foreground-subtle text-xs">
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

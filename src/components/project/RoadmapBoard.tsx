import FeedbackCard from "@/components/feedback/FeedbackCard";
import {
  Board,
  BoardColumn,
  BoardColumnBody,
  BoardColumnEmpty,
  BoardColumnHeader,
} from "@/components/ui/board";
import cn from "@/lib/utils";

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
  /**
   * Override the board height. Defaults to the dedicated roadmap route height;
   * the inline project-page view passes a shorter height (more chrome above).
   */
  className?: string;
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
  className,
}: Props) => {
  const columns = statuses.map((status) => ({
    status,
    posts: posts.filter((post) => post.statusTemplate?.rowId === status.rowId),
  }));

  return (
    // on sm+ the board is a bounded-height kanban: equal-height columns whose
    // lists scroll in place. on mobile the columns stack and flow naturally
    // (the page scrolls) so each card is fully visible instead of crammed into
    // a slice of a fixed-height container
    <Board
      className={cn("sm:h-[calc(100svh-13rem)] sm:items-stretch", className)}
    >
      {columns.map(({ status, posts: columnPosts }) => (
        <BoardColumn
          key={status.rowId ?? status.displayName}
          className="sm:h-full sm:min-h-0"
        >
          <BoardColumnHeader
            title={status.displayName ?? "Unknown"}
            color={status.color}
            count={columnPosts.length}
          />

          <BoardColumnBody className="sm:min-h-0 sm:flex-1 sm:overflow-y-auto">
            {columnPosts.length ? (
              columnPosts.map((post) => (
                <FeedbackCard
                  key={post.rowId}
                  feedback={post}
                  canManageFeedback={canManageFeedback}
                  projectStatuses={projectStatuses}
                  hideStatus
                  compact
                  // shrink-0 keeps cards from being squished by the flex column
                  // (which made the voting widget overflow the card)
                  className="shrink-0 border border-border-subtle bg-[var(--colors-card-item)] p-4"
                  titleProps={{ className: "line-clamp-2 overflow-hidden" }}
                  onClick={() => onSelectPost(post)}
                />
              ))
            ) : (
              <BoardColumnEmpty className="flex items-center justify-center py-6 sm:flex-1 sm:py-0">
                Nothing here yet
              </BoardColumnEmpty>
            )}
          </BoardColumnBody>
        </BoardColumn>
      ))}
    </Board>
  );
};

export default RoadmapBoard;

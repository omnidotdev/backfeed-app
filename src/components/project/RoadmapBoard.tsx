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
    // bounded board height so columns are equal height and their lists scroll
    // in place instead of stretching the page (standard kanban behavior)
    <Board className={cn("h-[calc(100svh-13rem)] sm:items-stretch", className)}>
      {columns.map(({ status, posts: columnPosts }) => (
        <BoardColumn
          key={status.rowId ?? status.displayName}
          className="h-full min-h-0"
        >
          <BoardColumnHeader
            title={status.displayName ?? "Unknown"}
            color={status.color}
            count={columnPosts.length}
          />

          <BoardColumnBody className="min-h-0 flex-1 overflow-y-auto">
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
              <BoardColumnEmpty className="flex flex-1 items-center justify-center py-0">
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

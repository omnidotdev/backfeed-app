import FeedbackCard from "@/components/feedback/FeedbackCard";
import {
  Board,
  BoardColumn,
  BoardColumnBody,
  BoardColumnEmpty,
  BoardColumnHeader,
} from "@/components/ui/board";

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
    <Board>
      {columns.map(({ status, posts: columnPosts }) => (
        <BoardColumn key={status.rowId ?? status.displayName}>
          <BoardColumnHeader
            title={status.displayName ?? "Unknown"}
            color={status.color}
            count={columnPosts.length}
          />

          {/* bound the column height so long lists scroll in place instead of
              stretching the page; empty columns match a single-card column */}
          <BoardColumnBody className="max-h-[calc(100svh-17rem)] overflow-y-auto">
            {columnPosts.length ? (
              columnPosts.map((post) => (
                <FeedbackCard
                  key={post.rowId}
                  feedback={post}
                  canManageFeedback={canManageFeedback}
                  projectStatuses={projectStatuses}
                  hideStatus
                  compact
                  className="border border-border-subtle bg-[var(--colors-card-item)] p-3"
                  titleProps={{ className: "line-clamp-2 overflow-hidden" }}
                  onClick={() => onSelectPost(post)}
                />
              ))
            ) : (
              <BoardColumnEmpty className="flex min-h-[4.75rem] items-center justify-center py-0">
                No feedback
              </BoardColumnEmpty>
            )}
          </BoardColumnBody>
        </BoardColumn>
      ))}
    </Board>
  );
};

export default RoadmapBoard;

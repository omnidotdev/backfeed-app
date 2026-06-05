import { LuArrowDown, LuArrowUp } from "react-icons/lu";

import SignInPrompt from "@/components/auth/SignInPrompt";
import { Button } from "@/components/ui/button";
import { VoteType } from "@/generated/graphql";
import useHandleVoteMutation from "@/lib/hooks/mutations/useHandleVoteMutation";
import cn from "@/lib/utils";

import type { Post, Project, Vote } from "@/generated/graphql";

interface Props {
  /** Feedback ID. */
  feedbackId: Post["rowId"];
  /** Project ID. */
  projectId: Project["rowId"];
  /** User's current vote on this post (if any) */
  userVote: Partial<Vote> | null | undefined;
  /** Total number of upvotes. */
  totalUpvotes: number;
  /** Total number of downvotes. */
  totalDownvotes: number;
  /** Whether voting is being handled from the dynamic feedback route. */
  isFeedbackRoute: boolean;
  /** Whether the user is authenticated. */
  isAuthenticated?: boolean;
  /** Current user's rowId for vote ownership. */
  userId?: string;
}

const VotingButtons = ({
  feedbackId,
  projectId,
  userVote,
  totalUpvotes,
  totalDownvotes,
  isFeedbackRoute,
  isAuthenticated = true,
  userId,
}: Props) => {
  const { mutate: handleUpvote, isPending: isUpvotePending } =
    useHandleVoteMutation({
      feedbackId,
      projectId,
      userVote,
      voteType: VoteType.Up,
      isFeedbackRoute,
      userId,
    });

  const { mutate: handleDownvote, isPending: isDownvotePending } =
    useHandleVoteMutation({
      feedbackId,
      projectId,
      userVote,
      voteType: VoteType.Down,
      isFeedbackRoute,
      userId,
    });

  const hasUpvote = userVote?.voteType === VoteType.Up;
  const hasDownvote = userVote?.voteType === VoteType.Down;
  const hasVote = hasUpvote || hasDownvote;

  // NB: we set `rowId` to `pending` optimistically for these values on occasion. If an attempt at triggering a mutation happens while they are still in this state, the mutation will fail
  const isOptimistic = [feedbackId, userVote?.rowId].some(
    (state) => state === "pending",
  );

  const isVotePending = isUpvotePending || isDownvotePending;
  const isMissingUserId = isAuthenticated && !userId;

  const netTotalVotes = totalUpvotes - totalDownvotes;

  const containerCls = cn(
    "flex min-w-12 flex-col items-center justify-center rounded-lg border py-2 transition-all [margin-right:0.75rem]",
    hasVote
      ? "border-[var(--colors-ruby-200)] bg-[var(--colors-ruby-50)] dark:border-[var(--colors-ruby-800)] dark:bg-[var(--colors-ruby-950)]/30"
      : "border-[var(--colors-neutral-200)] bg-white dark:border-[var(--colors-neutral-700)] dark:bg-[var(--colors-neutral-800)]",
  );

  const voteButtonCls = (isActive: boolean) =>
    cn(
      "my-0 h-auto min-w-0 p-0 hover:bg-transparent hover:text-[var(--colors-ruby-500)] dark:hover:text-[var(--colors-ruby-400)]",
      isActive
        ? "text-[var(--colors-ruby-500)] dark:text-[var(--colors-ruby-400)]"
        : "text-muted-foreground",
    );

  // Show login prompt for unauthenticated users
  if (!isAuthenticated) {
    return (
      <SignInPrompt action="vote">
        <div className="mr-3 flex min-w-12 flex-col items-center justify-center rounded-lg border border-[var(--colors-neutral-200)] bg-white py-2 transition-all dark:border-[var(--colors-neutral-700)] dark:bg-[var(--colors-neutral-800)]">
          <LuArrowUp className="size-4 text-muted-foreground" />
          <span className="my-1 font-bold text-foreground text-lg leading-none">
            {netTotalVotes}
          </span>
          <LuArrowDown className="size-4 text-muted-foreground" />
        </div>
      </SignInPrompt>
    );
  }

  return (
    <div className={containerCls}>
      <Button
        variant="ghost"
        size="sm"
        className={voteButtonCls(hasUpvote)}
        onClick={(e) => {
          e.stopPropagation();
          handleUpvote();
        }}
        disabled={isVotePending || isOptimistic || isMissingUserId}
      >
        <LuArrowUp className="size-4" strokeWidth={hasUpvote ? 3 : 2} />
      </Button>

      <span
        className={cn(
          "my-1 font-bold text-lg leading-none",
          hasVote
            ? "text-[var(--colors-ruby-500)] dark:text-[var(--colors-ruby-400)]"
            : "text-foreground",
        )}
      >
        {netTotalVotes}
      </span>

      <Button
        variant="ghost"
        size="sm"
        className={voteButtonCls(hasDownvote)}
        onClick={(e) => {
          e.stopPropagation();
          handleDownvote();
        }}
        disabled={isVotePending || isOptimistic || isMissingUserId}
      >
        <LuArrowDown className="size-4" strokeWidth={hasDownvote ? 3 : 2} />
      </Button>
    </div>
  );
};

export default VotingButtons;

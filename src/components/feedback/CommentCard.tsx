import { Format } from "@ark-ui/react";
import { getRouteApi } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useState } from "react";
import { LuCircleMinus, LuCirclePlus, LuMessageCircle } from "react-icons/lu";

import DestructiveAction from "@/components/core/DestructiveAction";
import CommentMessage from "@/components/feedback/CommentMessage";
import CreateReply from "@/components/feedback/CreateReply";
import Replies from "@/components/feedback/Replies";
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useDeleteCommentMutation } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { infiniteCommentsOptions } from "@/lib/options/comments";
import { feedbackByIdOptions } from "@/lib/options/feedback";
import setSingularOrPlural from "@/lib/util/setSingularOrPlural";
import cn from "@/lib/utils";

import type { ComponentProps } from "react";
import type { MentionItem } from "@/components/ui/rich-text-editor";
import type { CommentFragment } from "@/generated/graphql";

const feedbackRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/projects/$projectSlug/$feedbackId",
);

interface Props extends ComponentProps<"div"> {
  /** Comment. */
  comment: CommentFragment;
  /** Whether the user can reply to the comment. */
  canReply: boolean;
  /** Users offered in the reply `@`-mention typeahead. */
  mentionableUsers?: MentionItem[];
}

/**
 * Comment card.
 */
const CommentCard = ({
  comment,
  canReply,
  mentionableUsers,
  ...rest
}: Props) => {
  const { session, queryClient, hasAdminPrivileges } =
    feedbackRoute.useRouteContext();
  const { feedbackId } = feedbackRoute.useLoaderData();

  const [hoveredRepliesToggle, setHoveredRepliesToggle] = useState(false);

  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  const onToggleReplyForm = () => setIsReplyFormOpen((open) => !open);

  const [isRepliesOpen, setIsRepliesOpen] = useState(false);
  const onOpenReplies = () => setIsRepliesOpen(true);
  const onToggleReplies = () => setIsRepliesOpen((open) => !open);

  const { mutate: deleteComment, isPending: isDeletePending } =
    useDeleteCommentMutation({
      onSettled: () =>
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: infiniteCommentsOptions({
              feedbackId,
            }).queryKey,
          }),
          queryClient.invalidateQueries({ queryKey: ["Posts.infinite"] }),
          queryClient.invalidateQueries({
            queryKey: feedbackByIdOptions({
              rowId: feedbackId,
              userId: session?.user?.rowId,
            }).queryKey,
          }),
        ]),
    });

  const isPending = comment.rowId === "pending";

  const actionIsPending = isPending || isDeletePending;

  const isSender = comment.user?.rowId === session?.user?.rowId;

  const usernameInitial = comment?.user?.username?.[0]?.toUpperCase();

  return (
    <div
      className={cn(
        "relative flex flex-col p-2",
        actionIsPending && "opacity-50",
      )}
      {...rest}
    >
      <div className="flex items-stretch gap-2">
        <div className="flex h-full flex-col items-center self-stretch">
          <AvatarRoot size="xs">
            <AvatarImage src={comment?.user?.avatarUrl ?? undefined} alt="" />
            <AvatarFallback>{usernameInitial}</AvatarFallback>
          </AvatarRoot>

          <div
            className={cn(
              "w-px flex-1 bg-border transition-colors",
              hoveredRepliesToggle && "bg-foreground-muted",
            )}
          />
        </div>

        <div className="mt-1 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{comment?.user?.username}</span>

            <div className="size-1 rounded-full bg-foreground-subtle" />

            <span className="text-muted-foreground text-sm">
              {dayjs(comment.createdAt).fromNow()}
            </span>
          </div>

          <div className="break-words py-2 pr-4 text-muted-foreground">
            <CommentMessage message={comment.message} />
          </div>

          <div className="mb-[-1px] flex items-center gap-4 text-foreground-subtle/80">
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-1 bg-background px-0 text-foreground-subtle hover:text-foreground-muted disabled:text-[var(--colors-foreground-disabled)]"
              onClick={onToggleReplies}
              onMouseEnter={() => setHoveredRepliesToggle(true)}
              onMouseLeave={() => setHoveredRepliesToggle(false)}
              disabled={!comment.childComments.totalCount || actionIsPending}
            >
              {isRepliesOpen ? <LuCircleMinus /> : <LuCirclePlus />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="gap-1 bg-transparent px-0 text-[var(--colors-ruby-500)] text-sm hover:opacity-80 disabled:opacity-80 dark:text-[var(--colors-ruby-400)]"
              onClick={onToggleReplyForm}
              disabled={actionIsPending || !canReply}
            >
              <LuMessageCircle className="size-[1.125rem]" />
              Reply
            </Button>

            {!!comment.childComments.totalCount && (
              <Button
                variant="ghost"
                size="sm"
                className="gap-0.5 bg-transparent px-0 text-foreground-subtle hover:text-foreground-muted"
                onClick={onToggleReplies}
              >
                <Format.Number
                  value={comment.childComments.totalCount}
                  notation="compact"
                />

                <span className="mt-px text-sm">
                  {setSingularOrPlural({
                    value: comment.childComments.totalCount,
                    label: "Reply",
                    plural: "Replies",
                  })}
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {(isSender || hasAdminPrivileges) && (
        <DestructiveAction
          title={app.postPage.comments.delete.title}
          description={app.postPage.comments.delete.description}
          action={{
            label: app.postPage.comments.delete.action.label,
            onClick: () => deleteComment({ rowId: comment.rowId }),
          }}
          triggerProps={{
            "aria-label": app.postPage.comments.delete.title,
            tabIndex: -1,
            variant: "ghost",
            className:
              "absolute top-0 right-[-0.25rem] bg-transparent hover:bg-transparent",
            disabled: actionIsPending,
          }}
          iconClassName="text-[var(--colors-omni-ruby)]"
        />
      )}

      <CreateReply
        commentId={comment.rowId}
        open={isReplyFormOpen}
        canReply={canReply}
        onReply={onOpenReplies}
        mentionableUsers={mentionableUsers}
      />

      <Replies commentId={comment.rowId} open={isRepliesOpen} />
    </div>
  );
};

export default CommentCard;

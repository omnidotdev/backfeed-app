import { getRouteApi } from "@tanstack/react-router";
import dayjs from "dayjs";

import DestructiveAction from "@/components/core/DestructiveAction";
import CommentMessage from "@/components/feedback/CommentMessage";
import RoleBadge from "@/components/feedback/RoleBadge";
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
} from "@/components/ui/avatar";
import { useDeleteCommentMutation } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import useOrgRoleMap from "@/lib/hooks/useOrgRoleMap";
import {
  infiniteCommentsOptions,
  infiniteRepliesOptions,
} from "@/lib/options/comments";
import cn from "@/lib/utils";

import type { ComponentProps } from "react";
import type { ReplyFragment } from "@/generated/graphql";

const feedbackRoute = getRouteApi(
  "/_app/workspaces/$workspaceSlug/_layout/projects/$projectSlug/$feedbackId",
);

interface Props extends ComponentProps<"div"> {
  /** Reply. */
  reply: ReplyFragment;
}

/**
 * Reply card.
 */
const ReplyCard = ({ reply, className, ...rest }: Props) => {
  const { session, queryClient, hasAdminPrivileges, organizationId } =
    feedbackRoute.useRouteContext();
  const { feedbackId } = feedbackRoute.useLoaderData();

  const roleMap = useOrgRoleMap(organizationId);

  const { mutate: deleteReply, isPending: isDeletePending } =
    useDeleteCommentMutation({
      onSettled: () =>
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: infiniteCommentsOptions({
              feedbackId,
            }).queryKey,
          }),
          queryClient.invalidateQueries({
            queryKey: infiniteRepliesOptions({
              commentId: reply.parentId!,
            }).queryKey,
          }),
        ]),
    });

  const isPending = reply.rowId === "pending";

  const actionIsPending = isPending || isDeletePending;

  const isSender = reply.user?.rowId === session?.user?.rowId;

  return (
    <div
      className={cn(
        "relative flex items-center rounded-sm bg-card p-2",
        actionIsPending && "opacity-50",
        className,
      )}
      {...rest}
    >
      <div className="flex items-center gap-2 pl-2 sm:pl-0">
        <AvatarRoot size="xs" className="hidden self-start sm:flex">
          <AvatarImage src={reply.user?.avatarUrl ?? undefined} alt="" />
          <AvatarFallback>
            {reply.user?.username?.[0]?.toUpperCase()}
          </AvatarFallback>
        </AvatarRoot>

        <div className="mt-1 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm">
              {reply.user?.username}
            </span>

            <RoleBadge
              role={roleMap.get(reply.user?.identityProviderId ?? "")}
            />

            <div className="size-1 rounded-full bg-foreground-subtle" />

            <span className="text-muted-foreground text-xs sm:text-sm">
              {dayjs(reply.createdAt).fromNow()}
            </span>
          </div>

          <p className="break-words text-muted-foreground text-sm">
            <CommentMessage message={reply.message} />
          </p>
        </div>
      </div>

      {(isSender || hasAdminPrivileges) && (
        <DestructiveAction
          title={app.postPage.comments.deleteReply.title}
          description={app.postPage.comments.deleteReply.description}
          action={{
            label: app.postPage.comments.deleteReply.action.label,
            onClick: () => deleteReply({ rowId: reply.rowId }),
          }}
          triggerProps={{
            "aria-label": app.postPage.comments.deleteReply.title,
            tabIndex: -1,
            variant: "ghost",
            className:
              "absolute top-[0.25rem] right-[-0.25rem] bg-transparent hover:bg-transparent",
            disabled: actionIsPending,
          }}
          iconClassName="text-[var(--colors-omni-ruby)]"
        />
      )}
    </div>
  );
};

export default ReplyCard;

import { Avatar, Circle, HStack, Stack, Text, sigil } from "@omnidev/sigil";
import { useParams, useRouteContext } from "@tanstack/react-router";
import dayjs from "dayjs";

import DestructiveAction from "@/components/core/DestructiveAction";
import { useDeleteCommentMutation } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import {
  infiniteCommentsOptions,
  infiniteRepliesOptions,
} from "@/lib/options/comments";

import type { HstackProps } from "@omnidev/sigil";
import type { ReplyFragment } from "@/generated/graphql";

interface Props extends HstackProps {
  /** Reply. */
  reply: ReplyFragment;
}

/**
 * Reply card.
 */
const ReplyCard = ({ reply, ...rest }: Props) => {
  const { session, queryClient, hasAdminPrivileges } = useRouteContext({
    from: "/_auth/workspaces/$workspaceSlug/_layout/projects/$projectSlug/$feedbackId",
  });
  const { feedbackId } = useParams({
    from: "/_auth/workspaces/$workspaceSlug/_layout/projects/$projectSlug/$feedbackId",
  });

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
    <HStack
      position="relative"
      borderRadius="sm"
      bgColor="card-item"
      gap={0}
      p={2}
      opacity={actionIsPending ? 0.5 : 1}
      {...rest}
    >
      <HStack pl={{ baseToSm: 2 }}>
        <Avatar
          name={reply.user?.username}
          size="xs"
          placeSelf="flex-start"
          display={{ baseToSm: "none" }}
        />

        <Stack mt={1}>
          <HStack>
            <Text fontWeight="semibold" fontSize={{ baseToSm: "sm" }}>
              {reply.user?.username}
            </Text>

            <Circle size={1} bgColor="foreground.subtle" />

            <Text fontSize={{ base: "xs", sm: "sm" }} color="foreground.muted">
              {dayjs(reply.createdAt).fromNow()}
            </Text>
          </HStack>

          <Text
            color="foreground.muted"
            wordBreak="break-word"
            fontSize={{ baseToSm: "sm" }}
          >
            {reply.message?.split("\n").map((line, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: simple index due to the nature of the rendering
              <sigil.span key={index}>
                {line}
                <br />
              </sigil.span>
            ))}
          </Text>
        </Stack>
      </HStack>

      {(isSender || hasAdminPrivileges) && (
        <DestructiveAction
          title={app.feedbackPage.comments.deleteReply.title}
          description={app.feedbackPage.comments.deleteReply.description}
          action={{
            label: app.feedbackPage.comments.deleteReply.action.label,
            onClick: () => deleteReply({ rowId: reply.rowId }),
          }}
          triggerProps={{
            "aria-label": app.feedbackPage.comments.deleteReply.title,
            tabIndex: -1,
            color: "omni.ruby",
            backgroundColor: "transparent",
            position: "absolute",
            top: 1,
            right: -1,
            disabled: actionIsPending,
          }}
        />
      )}
    </HStack>
  );
};

export default ReplyCard;

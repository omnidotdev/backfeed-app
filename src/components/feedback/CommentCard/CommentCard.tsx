"use client";

import { Avatar, Stack, Text } from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams } from "next/navigation";

import { DestructiveAction } from "components/core";
import {
  useDeleteCommentMutation,
  useInfiniteCommentsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { useOrganizationMembership } from "lib/hooks";

import type { StackProps } from "@omnidev/sigil";
import type { Comment, Organization } from "generated/graphql";
import type { Session } from "next-auth";

interface Props extends StackProps {
  /** Authenticated user. */
  user: Session["user"];
  /** Organization ID. */
  organizationId: Organization["rowId"];
  /** Comment ID. */
  commentId: Comment["rowId"];
  /** Comment sender. */
  senderName: string | null | undefined;
  /** Comment message. */
  message: Comment["message"];
  /** Date the comment was created. */
  createdAt: Comment["createdAt"];
  /** Whether the comment is pending. */
  isPending?: boolean;
  /** Whether the logged in user is the comment sender. */
  isSender?: boolean;
}

/**
 * Comment card.
 */
const CommentCard = ({
  user,
  organizationId,
  commentId,
  senderName,
  message,
  createdAt,
  isPending = false,
  isSender = false,
  ...rest
}: Props) => {
  const queryClient = useQueryClient();

  const { feedbackId } = useParams<{
    feedbackId: string;
  }>();

  const { isAdmin } = useOrganizationMembership({
    organizationId,
    userId: user?.rowId,
  });

  const { mutate: deleteComment, isPending: isDeletePending } =
    useDeleteCommentMutation({
      onSettled: () =>
        queryClient.invalidateQueries({
          queryKey: useInfiniteCommentsQuery.getKey({
            pageSize: 5,
            feedbackId,
          }),
        }),
    });

  const actionIsPending = isPending || isDeletePending;

  return (
    <Stack
      position="relative"
      direction="row"
      bgColor="card-item"
      borderRadius="sm"
      gap={4}
      p={4}
      opacity={actionIsPending ? 0.5 : 1}
      {...rest}
    >
      <Avatar name={senderName} size="sm" />

      <Stack gap={1} flex={1} pb={8}>
        <Text fontWeight="semibold">{senderName}</Text>

        <Text fontSize="sm" color="foreground.subtle">
          {message?.split("\n").map((line, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: simple index due to the nature of the rendering
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </Text>
      </Stack>

      {(isSender || isAdmin) && (
        <Stack position="absolute" top={1} right={1}>
          <DestructiveAction
            title={app.feedbackPage.comments.delete.title}
            description={app.feedbackPage.comments.delete.description}
            action={{
              label: app.feedbackPage.comments.delete.action.label,
              onClick: () => deleteComment({ rowId: commentId }),
            }}
            triggerProps={{
              "aria-label": app.feedbackPage.comments.delete.title,
              color: "omni.ruby",
              backgroundColor: "transparent",
              disabled: actionIsPending,
            }}
          />
        </Stack>
      )}

      <Text
        position="absolute"
        bottom={4}
        right={4}
        fontSize="sm"
        color="foreground.muted"
      >
        {dayjs(createdAt).fromNow()}
      </Text>
    </Stack>
  );
};

export default CommentCard;

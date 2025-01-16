"use client";

import { Stack, Text, VStack } from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams } from "next/navigation";

import { DestructiveAction } from "components/core";
import {
  useDeleteCommentMutation,
  useInfiniteCommentsQuery,
} from "generated/graphql";
import { app } from "lib/config";

import type { StackProps } from "@omnidev/sigil";

interface Props extends StackProps {
  /** Comment ID. */
  commentId: string;
  /** Comment sender. */
  senderName: string | null | undefined;
  /** Comment message. */
  message: string | null | undefined;
  /** Date the comment was created. */
  createdAt: Date | null | undefined;
  /** Whether the comment is pending. */
  isPending?: boolean;
  /** Whether the logged in user is the comment sender. */
  isSender?: boolean;
}

/**
 * Comment card.
 */
const Comment = ({
  commentId,
  senderName,
  message,
  createdAt,
  isPending = false,
  isSender = false,
  ...rest
}: Props) => {
  const queryClient = useQueryClient();

  const { feedbackId } = useParams<{ feedbackId: string }>();

  const { mutate: deleteComment, isPending: isDeletePending } =
    useDeleteCommentMutation({
      onSuccess: () =>
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
      boxShadow="xs"
      borderRadius="sm"
      gap={4}
      p={4}
      opacity={actionIsPending ? 0.5 : 1}
      {...rest}
    >
      <VStack
        justify="center"
        bgColor="background.subtle"
        borderRadius="full"
        p={2}
        h={8}
        w={8}
        display={{ base: "none", sm: "flex" }}
      >
        <Text color="foreground.muted">{senderName?.[0]}</Text>
      </VStack>

      <Stack gap={1} flex={1} pb={8}>
        <Text fontWeight="semibold">{senderName}</Text>

        <Text fontSize="sm" color="foreground.subtle">
          {message}
        </Text>
      </Stack>

      {isSender && (
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

export default Comment;

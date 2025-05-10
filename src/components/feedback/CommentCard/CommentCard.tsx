"use client";

import {
  Avatar,
  Button,
  Circle,
  Divider,
  HStack,
  Icon,
  Stack,
  Text,
  sigil,
  useDisclosure,
} from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { LuCircleMinus, LuCirclePlus, LuMessageCircle } from "react-icons/lu";

import { DestructiveAction } from "components/core";
import { CreateReply, Replies } from "components/feedback";
import {
  useDeleteCommentMutation,
  useInfiniteCommentsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { useOrganizationMembership } from "lib/hooks";

import type { StackProps } from "@omnidev/sigil";
import type { CommentFragment, Organization } from "generated/graphql";
import type { Session } from "next-auth";

interface Props extends StackProps {
  /** Authenticated user. */
  user: Session["user"];
  /** Comment. */
  comment: CommentFragment;
  /** Organization ID. */
  organizationId: Organization["rowId"];
  /** Comment sender. */
  senderName: string | null | undefined;
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
  comment,
  organizationId,
  senderName,
  isPending = false,
  isSender = false,
  ...rest
}: Props) => {
  const queryClient = useQueryClient();

  const { isOpen: isReplyFormOpen, onToggle: onToggleReplyForm } =
    useDisclosure();

  const { isOpen: isRepliesOpen, onToggle: onToggleReplies } = useDisclosure();

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
            feedbackId,
          }),
        }),
    });

  const actionIsPending = isPending || isDeletePending;

  return (
    <Stack
      position="relative"
      borderRadius="sm"
      gap={0}
      p={1}
      opacity={actionIsPending ? 0.5 : 1}
      {...rest}
    >
      <HStack>
        <Stack gap={0} placeSelf="flex-start" h="full" align="center">
          <Avatar name={senderName} size="xs" />

          <Divider orientation="vertical" h="full" />
        </Stack>

        <Stack mt={1}>
          <HStack>
            <Text fontWeight="semibold">{senderName}</Text>

            <Circle size={1} bgColor="foreground.subtle" />

            <Text fontSize="sm" color="foreground.muted">
              {dayjs(comment.createdAt).fromNow()}
            </Text>
          </HStack>

          <Text color="foreground.muted" py={2} pr={4} wordBreak="break-word">
            {comment.message?.split("\n").map((line, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: simple index due to the nature of the rendering
              <sigil.span key={index}>
                {line}
                <br />
              </sigil.span>
            ))}
          </Text>

          <HStack color="foreground.subtle/80" gap={4} mb="-1px">
            <Button
              position="absolute"
              left={0}
              bgColor="background.default"
              variant="icon"
              onClick={onToggleReplies}
              disabled={!comment.childComments.totalCount}
              color={{
                base: "foreground.subtle",
                _disabled: "foreground.disabled",
                _hover: {
                  base: "foreground.muted",
                  _disabled: "foreground.disabled",
                },
              }}
            >
              <Icon src={isRepliesOpen ? LuCircleMinus : LuCirclePlus} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              px={0}
              bgColor="transparent"
              _hover={{ opacity: 0.8 }}
              gap={1}
              fontSize="sm"
              color="brand.senary"
              onClick={onToggleReplyForm}
            >
              <Icon src={LuMessageCircle} h={4.5} w={4.5} />
              Reply
            </Button>

            {!!comment.childComments.totalCount && (
              <Text fontSize="sm" mt="1px">
                {comment.childComments.totalCount} Replies
              </Text>
            )}
          </HStack>
        </Stack>
      </HStack>

      {(isSender || isAdmin) && (
        <DestructiveAction
          title={app.feedbackPage.comments.delete.title}
          description={app.feedbackPage.comments.delete.description}
          action={{
            label: app.feedbackPage.comments.delete.action.label,
            onClick: () => deleteComment({ rowId: comment.rowId }),
          }}
          triggerProps={{
            "aria-label": app.feedbackPage.comments.delete.title,
            tabIndex: -1,
            color: "omni.ruby",
            backgroundColor: "transparent",
            position: "absolute",
            top: 0,
            right: 0,
            disabled: actionIsPending,
          }}
        />
      )}

      <CreateReply commentId={comment.rowId} open={isReplyFormOpen} />

      <Replies
        user={user}
        organizationId={organizationId}
        commentId={comment.rowId}
        open={isRepliesOpen}
      />
    </Stack>
  );
};

export default CommentCard;

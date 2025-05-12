"use client";

import { Format } from "@ark-ui/react";
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
import { useState } from "react";
import { LuCircleMinus, LuCirclePlus, LuMessageCircle } from "react-icons/lu";

import { DestructiveAction } from "components/core";
import { CreateReply, Replies } from "components/feedback";
import {
  useDeleteCommentMutation,
  useInfiniteCommentsQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { useOrganizationMembership } from "lib/hooks";
import { setSingularOrPlural } from "lib/util";

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
}

/**
 * Comment card.
 */
const CommentCard = ({ user, comment, organizationId, ...rest }: Props) => {
  const [hoveredRepliesToggle, setHoveredRepliesToggle] = useState(false);

  const queryClient = useQueryClient();

  const { isOpen: isReplyFormOpen, onToggle: onToggleReplyForm } =
    useDisclosure();

  const {
    isOpen: isRepliesOpen,
    onOpen: onOpenReplies,
    onToggle: onToggleReplies,
  } = useDisclosure();

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

  const isPending = comment.rowId === "pending";

  const actionIsPending = isPending || isDeletePending;

  const isSender = comment.user?.rowId === user?.rowId;

  return (
    <Stack
      position="relative"
      gap={0}
      p={2}
      opacity={actionIsPending ? 0.5 : 1}
      {...rest}
    >
      <HStack>
        <Stack gap={0} placeSelf="flex-start" h="full" align="center">
          <Avatar name={comment?.user?.username} size="xs" />

          <Divider
            orientation="vertical"
            h="full"
            transitionDuration="normal"
            transitionProperty="color"
            transitionTimingFunction="default"
            color={hoveredRepliesToggle ? "foreground.muted" : undefined}
          />
        </Stack>

        <Stack mt={1} gap={1}>
          <HStack>
            <Text fontWeight="semibold">{comment?.user?.username}</Text>

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
              left={1}
              bgColor="background.default"
              variant="icon"
              onClick={onToggleReplies}
              onMouseEnter={() => setHoveredRepliesToggle(true)}
              onMouseLeave={() => setHoveredRepliesToggle(false)}
              disabled={!comment.childComments.totalCount || actionIsPending}
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
              disabled={actionIsPending}
            >
              <Icon src={LuMessageCircle} h={4.5} w={4.5} />
              Reply
            </Button>

            {!!comment.childComments.totalCount && (
              <Button
                gap={0.5}
                variant="ghost"
                bgColor="transparent"
                px={0}
                onClick={onToggleReplies}
                color={{
                  base: "foreground.subtle",
                  _disabled: "foreground.disabled",
                  _hover: {
                    base: "foreground.muted",
                    _disabled: "foreground.disabled",
                  },
                }}
              >
                <Format.Number
                  value={comment.childComments.totalCount}
                  notation="compact"
                />

                <Text fontSize="sm" mt="1px">
                  {setSingularOrPlural({
                    value: comment.childComments.totalCount,
                    label: "Reply",
                    plural: "Replies",
                  })}
                </Text>
              </Button>
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
            right: -1,
            disabled: actionIsPending,
          }}
        />
      )}

      <CreateReply
        commentId={comment.rowId}
        open={isReplyFormOpen}
        onReply={onOpenReplies}
      />

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

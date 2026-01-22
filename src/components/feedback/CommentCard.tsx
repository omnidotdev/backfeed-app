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
import { getRouteApi } from "@tanstack/react-router";
import dayjs from "dayjs";
import { useState } from "react";
import { LuCircleMinus, LuCirclePlus, LuMessageCircle } from "react-icons/lu";

import DestructiveAction from "@/components/core/DestructiveAction";
import CreateReply from "@/components/feedback/CreateReply";
import Replies from "@/components/feedback/Replies";
import { useDeleteCommentMutation } from "@/generated/graphql";
import app from "@/lib/config/app.config";
import { infiniteCommentsOptions } from "@/lib/options/comments";
import { feedbackByIdOptions } from "@/lib/options/feedback";
import setSingularOrPlural from "@/lib/util/setSingularOrPlural";

import type { StackProps } from "@omnidev/sigil";
import type { CommentFragment } from "@/generated/graphql";

const feedbackRoute = getRouteApi(
  "/_public/workspaces/$workspaceSlug/_layout/projects/$projectSlug/$feedbackId",
);

interface Props extends StackProps {
  /** Comment. */
  comment: CommentFragment;
  /** Whether the user can reply to the comment. */
  canReply: boolean;
}

/**
 * Comment card.
 */
const CommentCard = ({ comment, canReply, ...rest }: Props) => {
  const { session, queryClient, hasAdminPrivileges } =
    feedbackRoute.useRouteContext();
  const { feedbackId } = feedbackRoute.useParams();

  const [hoveredRepliesToggle, setHoveredRepliesToggle] = useState(false);

  const { isOpen: isReplyFormOpen, onToggle: onToggleReplyForm } =
    useDisclosure();

  const {
    isOpen: isRepliesOpen,
    onOpen: onOpenReplies,
    onToggle: onToggleReplies,
  } = useDisclosure();

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
          <Avatar
            imageSrc={comment?.user?.avatarUrl ?? undefined}
            name={comment?.user?.username}
            size="xs"
          />

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
              px={0}
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
              opacity={{ _disabled: 0.8, _hover: 0.8 }}
              gap={1}
              fontSize="sm"
              color={{ base: "ruby.500", _dark: "ruby.400" }}
              onClick={onToggleReplyForm}
              disabled={actionIsPending || !canReply}
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
        canReply={canReply}
        onReply={onOpenReplies}
      />

      <Replies commentId={comment.rowId} open={isRepliesOpen} />
    </Stack>
  );
};

export default CommentCard;

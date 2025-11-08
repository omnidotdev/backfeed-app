"use client";

import { Avatar, Circle, HStack, Stack, sigil, Text } from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams } from "next/navigation";

import { DestructiveAction } from "components/core";
import {
  useDeleteCommentMutation,
  useInfiniteCommentsQuery,
  useInfiniteRepliesQuery,
} from "generated/graphql";
import { app } from "lib/config";
import { useOrganizationMembership } from "lib/hooks";

import type { HstackProps } from "@omnidev/sigil";
import type { Organization, ReplyFragment } from "generated/graphql";
import type { Session } from "next-auth";

interface Props extends HstackProps {
  /** Authenticated user. */
  user: Session["user"] | undefined;
  /** Reply. */
  reply: ReplyFragment;
  /** Organization ID. */
  organizationId: Organization["rowId"];
}

/**
 * Reply card.
 */
const ReplyCard = ({ user, reply, organizationId, ...rest }: Props) => {
  const queryClient = useQueryClient();

  const { feedbackId } = useParams<{
    feedbackId: string;
  }>();

  const { isAdmin } = useOrganizationMembership({
    organizationId,
    userId: user?.rowId,
  });

  const { mutate: deleteReply, isPending: isDeletePending } =
    useDeleteCommentMutation({
      onSettled: () =>
        Promise.all([
          queryClient.invalidateQueries({
            queryKey: useInfiniteCommentsQuery.getKey({
              feedbackId,
            }),
          }),
          queryClient.invalidateQueries({
            queryKey: useInfiniteRepliesQuery.getKey({
              commentId: reply.parentId!,
            }),
          }),
        ]),
    });

  const isPending = reply.rowId === "pending";

  const actionIsPending = isPending || isDeletePending;

  const isSender = reply.user?.rowId === user?.rowId;

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

      {(isSender || isAdmin) && (
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

"use client";

import {
  Avatar,
  Circle,
  Divider,
  HStack,
  Icon,
  Stack,
  Text,
} from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import {
  useDeleteCommentMutation,
  useInfiniteCommentsQuery,
} from "generated/graphql";
import { useOrganizationMembership } from "lib/hooks";
import { useParams } from "next/navigation";

import type { StackProps } from "@omnidev/sigil";
import type { CommentFragment, Organization } from "generated/graphql";
import type { Session } from "next-auth";
import { LuCirclePlus, LuEllipsis, LuMessageCircle } from "react-icons/lu";

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
      borderRadius="sm"
      gap={0}
      opacity={actionIsPending ? 0.5 : 1}
      {...rest}
    >
      <HStack position="relative">
        <Stack gap={0} placeSelf="flex-start" h="full" align="center">
          <Avatar name={senderName} size="xs" />

          {/* {!!comment.childComments.totalCount && ( */}
          <Divider orientation="vertical" h="full" />
          {/* )} */}
        </Stack>

        <Stack flex={1} mt={1}>
          <HStack>
            <Text fontWeight="semibold">{senderName}</Text>

            <Circle size={1} bgColor="foreground.subtle" />

            <Text fontSize="sm" color="foreground.muted">
              {dayjs(comment.createdAt).fromNow()}
            </Text>
          </HStack>

          <Text color="foreground.muted">
            {comment.message?.split("\n").map((line, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: simple index due to the nature of the rendering
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          </Text>

          <HStack color="foreground.subtle/80" gap={4}>
            <Icon
              src={LuCirclePlus}
              position="absolute"
              left={1.5}
              bgColor="background.default"
            />

            <HStack gap={1} fontSize="sm">
              <Icon src={LuMessageCircle} h={4.5} w={4.5} />
              {/* {comment.childComments.totalCount} */}
              Reply
            </HStack>

            <Icon src={LuEllipsis} />
          </HStack>
        </Stack>
      </HStack>

      {/* <HStack>
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
              color: "omni.ruby",
              backgroundColor: "transparent",
              disabled: actionIsPending,
            }}
          />
        )}

        <HStack color="foreground.subtle" gap={1} h={10} w={10}>
          <Icon src={LuMessageCircle} h={4.5} w={4.5} />
          {comment.childComments.totalCount}
        </HStack>
      </HStack> */}
    </Stack>
  );
};

export default CommentCard;

"use client";

import {
  Circle,
  HStack,
  Icon,
  Menu,
  MenuItem,
  MenuItemGroup,
  Stack,
  Text,
} from "@omnidev/sigil";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { LuCheck, LuChevronDown } from "react-icons/lu";
import { match } from "ts-pattern";

import { StatusBadge } from "components/core";
import { useFeedbackByIdQuery, useUpdatePostMutation } from "generated/graphql";

import type { HstackProps } from "@omnidev/sigil";
import type {
  FeedbackByIdQuery,
  FeedbackFragment,
  PostStatus,
} from "generated/graphql";

interface ProjectStatus {
  /** Post status row ID. */
  rowId: PostStatus["rowId"] | undefined;
  /** Post status. */
  status: PostStatus["status"] | undefined;
  /** Post status color. */
  color: PostStatus["color"];
}

interface Props extends HstackProps {
  /** Feedback details. */
  feedback: Partial<FeedbackFragment>;
  /** Total number of upvotes. */
  totalUpvotes: number | undefined;
  /** Total number of downvotes. */
  totalDownvotes: number | undefined;
  /** Whether the feedback is pending. */
  isPending?: boolean;
  /** Project status options. */
  projectStatuses?: ProjectStatus[];
}

/**
 * Feedback card.
 */
const FeedbackCard = ({
  feedback,
  totalUpvotes = 0,
  totalDownvotes = 0,
  isPending = false,
  projectStatuses,
  children,
  ...rest
}: Props) => {
  const queryClient = useQueryClient();

  const canManageStatus = projectStatuses != null;

  const { mutate: updateStatus, isPending: isUpdateStatusPending } =
    useUpdatePostMutation({
      onMutate: (variables) => {
        const snapshot = queryClient.getQueryData(
          useFeedbackByIdQuery.getKey({ rowId: feedback.rowId! }),
        ) as FeedbackByIdQuery;

        const updatedStatus = projectStatuses?.find(
          (status) => status.rowId === variables.patch.statusId,
        );

        queryClient.setQueryData(
          useFeedbackByIdQuery.getKey({ rowId: feedback.rowId! }),
          {
            post: {
              ...snapshot?.post,
              statusId: variables.patch.statusId,
              statusUpdatedAt: variables.patch.statusUpdatedAt,
              status: {
                ...snapshot.post?.status,
                status: updatedStatus?.status,
                color: updatedStatus?.color,
              },
            },
          },
        );
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: useFeedbackByIdQuery.getKey({ rowId: feedback.rowId! }),
        });
      },
    });

  const netTotalVotes = totalUpvotes - totalDownvotes;

  const netVotesColor = match(netTotalVotes)
    .with(0, () => "gray.400")
    .when(
      (net) => net > 0,
      () => "brand.tertiary",
    )
    .otherwise(() => "brand.quinary");

  const netVotesSign = match(netTotalVotes)
    .with(0, () => "+/- ")
    .when(
      (net) => net > 0,
      () => "+",
    )
    .otherwise(() => "");

  return (
    <HStack
      position="relative"
      gap={8}
      bgColor="background.default"
      borderRadius="lg"
      p={{ base: 4, sm: 6 }}
      opacity={isPending ? 0.5 : 1}
      {...rest}
    >
      <Stack w="full">
        <HStack justify="space-between">
          <Stack gap={1}>
            <Text
              fontWeight="semibold"
              fontSize="lg"
              lineHeight={1}
              maxW="50svw"
            >
              {feedback.title}
            </Text>

            <HStack fontSize="sm" gap={{ base: 1, sm: 2 }}>
              <Text color="foreground.subtle">{feedback.user?.username}</Text>

              <Circle size={1} bgColor="foreground.subtle" placeSelf="center" />

              <Text color="foreground.subtle">
                {dayjs(isPending ? new Date() : feedback.createdAt).fromNow()}
              </Text>
            </HStack>
          </Stack>

          {children}
        </HStack>

        <Text wordBreak="break-word">{feedback.description}</Text>

        <Stack justify="space-between" gap={4} mt={2}>
          <HStack justify="space-between">
            <HStack>
              <Menu
                trigger={
                  <StatusBadge
                    status={feedback.status!}
                    cursor={canManageStatus ? "pointer" : "default"}
                  >
                    {canManageStatus && <Icon src={LuChevronDown} />}
                  </StatusBadge>
                }
                triggerProps={{
                  disabled: !canManageStatus || isUpdateStatusPending,
                }}
              >
                <MenuItemGroup>
                  {projectStatuses?.map((status) => (
                    <MenuItem
                      key={status.rowId}
                      value={status.rowId!}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      // NB: Needs to be analyzed at runtime.
                      // TODO: Implement check to validate that the status color is a valid color
                      style={status.color ? { color: status.color } : undefined}
                      onClick={() =>
                        updateStatus({
                          rowId: feedback.rowId!,
                          patch: {
                            statusId: status.rowId!,
                            statusUpdatedAt: new Date(),
                          },
                        })
                      }
                    >
                      {status.status}

                      {status.rowId === feedback.status?.rowId && (
                        <Icon src={LuCheck} h={4} w={4} color="green.500" />
                      )}
                    </MenuItem>
                  ))}
                </MenuItemGroup>
              </Menu>

              <Text
                display={{ base: "none", sm: "inline-flex" }}
                fontSize="sm"
                color="foreground.subtle"
              >
                {`Updated: ${dayjs(isPending ? new Date() : feedback.statusUpdatedAt).fromNow()}`}
              </Text>
            </HStack>

            <Text
              color={netVotesColor}
              whiteSpace="nowrap"
              placeSelf="flex-start"
            >
              {`${netVotesSign}${netTotalVotes}`}
            </Text>
          </HStack>
        </Stack>
      </Stack>
    </HStack>
  );
};
export default FeedbackCard;

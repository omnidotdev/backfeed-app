"use client";

import {
  Flex,
  HStack,
  Icon,
  Menu,
  MenuItem,
  MenuItemGroup,
  Stack,
  Text,
} from "@omnidev/sigil";
import dayjs from "dayjs";
import { LuCheck, LuChevronDown } from "react-icons/lu";
import { match } from "ts-pattern";

import { StatusBadge, getStatusColor } from "components/core";

import type { HstackProps, StackProps } from "@omnidev/sigil";
import type { FeedbackFragment, PostStatus } from "generated/graphql";

interface ProjectStatus {
  /** Post status row ID. */
  rowId: PostStatus["rowId"] | undefined;
  /** Post status. */
  status: PostStatus["status"] | undefined;
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
  /** Additional props to pass to the container. */
  containerProps?: StackProps;
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
  containerProps,
  children,
  ...rest
}: Props) => {
  const canManageStatus = projectStatuses != null;

  const netTotalVotes = totalUpvotes - totalDownvotes;

  const netVotesColor = match(netTotalVotes)
    .with(0, () => "gray.400")
    .when(
      (net) => net > 0,
      () => "brand.tertiary"
    )
    .otherwise(() => "brand.quinary");

  const netVotesSign = match(netTotalVotes)
    .with(0, () => "+/- ")
    .when(
      (net) => net > 0,
      () => "+"
    )
    .otherwise(() => "");

  return (
    <HStack
      position="relative"
      gap={8}
      bgColor="background.default"
      borderRadius="lg"
      boxShadow="lg"
      p={{ base: 4, sm: 6 }}
      opacity={isPending ? 0.5 : 1}
      {...rest}
    >
      <Stack w="full">
        <HStack justify="space-between">
          {/* TODO: use container queries to apply direction. Currently experiencing issues. */}
          <Stack
            direction={{ base: "column", lg: "row" }}
            gap={4}
            {...containerProps}
          >
            <Text fontWeight="semibold" fontSize="2xl">
              {feedback.title}
            </Text>

            <HStack>
              <Menu
                trigger={
                  <StatusBadge
                    status={feedback.status?.status!}
                    cursor={canManageStatus ? "pointer" : "default"}
                  >
                    {canManageStatus && <Icon src={LuChevronDown} />}
                  </StatusBadge>
                }
                triggerProps={{
                  disabled: !canManageStatus,
                }}
              >
                {/* TODO: handle status mutations */}
                <MenuItemGroup>
                  {projectStatuses?.map((status) => (
                    <MenuItem
                      key={status.rowId}
                      value={status.rowId!}
                      color={getStatusColor(status.status!)}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      {status.status}

                      {status.rowId === feedback.status?.rowId && (
                        <Icon src={LuCheck} h={4} w={4} color="green.500" />
                      )}
                    </MenuItem>
                  ))}
                </MenuItemGroup>
              </Menu>

              <Text fontSize="sm" color="foreground.subtle">
                {`Updated: ${dayjs(isPending ? new Date() : feedback.statusUpdatedAt).fromNow()}`}
              </Text>
            </HStack>
          </Stack>

          <Text
            color={netVotesColor}
            whiteSpace="nowrap"
            placeSelf="flex-start"
          >
            {`${netVotesSign}${netTotalVotes}`}
          </Text>
        </HStack>

        <Text color="foreground.muted" mt={4}>
          {feedback.description}
        </Text>

        <Stack justify="space-between" gap={4} mt={2}>
          <Stack
            direction={{ base: "column", sm: "row" }}
            fontSize="sm"
            gap={{ base: 1, sm: 2 }}
          >
            <Text color="foreground.subtle">{feedback.user?.username}</Text>

            <Flex
              borderRadius="full"
              h={1}
              w={1}
              bgColor="foreground.subtle"
              display={{ base: "none", sm: "flex" }}
              placeSelf="center"
            />

            <Text color="foreground.subtle">
              {dayjs(isPending ? new Date() : feedback.createdAt).fromNow()}
            </Text>
          </Stack>

          <HStack fontSize="sm" placeSelf="flex-end" gap={1}>
            {children}
          </HStack>
        </Stack>
      </Stack>
    </HStack>
  );
};
export default FeedbackCard;

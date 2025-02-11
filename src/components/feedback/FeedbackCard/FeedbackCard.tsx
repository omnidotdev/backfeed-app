"use client";

import { Badge, Flex, HStack, Stack, Text } from "@omnidev/sigil";
import dayjs from "dayjs";
import { match } from "ts-pattern";

import type { HstackProps } from "@omnidev/sigil";

interface Props extends HstackProps {
  /** Feedback title. */
  title: string;
  /** Feedback description. */
  description: string;
  /** Username of the feedback author. */
  username: string;
  /** Date when the feedback was created. */
  createdAt?: Date | null;
  // TODO: implement status logic
  /** Status of the feedback. */
  status: string;
  /** When the status was last updated. */
  statusUpdatedAt?: Date | null;
  /** Total number of upvotes. */
  totalUpvotes: number | undefined;
  /** Total number of downvotes. */
  totalDownvotes: number | undefined;
  /** Whether the feedback is pending. */
  isPending?: boolean;
}

/**
 * Feedback card.
 */
const FeedbackCard = ({
  title,
  description,
  username,
  createdAt,
  status,
  statusUpdatedAt,
  totalUpvotes = 0,
  totalDownvotes = 0,
  isPending = false,
  children,
  ...rest
}: Props) => {
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
          <Stack direction={{ base: "column", sm: "row" }} gap={4}>
            <Text fontWeight="semibold" fontSize="2xl">
              {title}
            </Text>

            <HStack>
              <Badge
                variant="outline"
                color="brand.secondary"
                borderColor="brand.secondary"
              >
                {status}
              </Badge>

              <Text fontSize="sm" color="foreground.subtle">
                {`Updated: ${dayjs(isPending ? new Date() : statusUpdatedAt).fromNow()}`}
              </Text>
            </HStack>
          </Stack>

          <Text color={netVotesColor} whiteSpace="nowrap">
            {`${netVotesSign}${netTotalVotes}`}
          </Text>
        </HStack>

        <Text color="foreground.muted">{description}</Text>

        <Stack justify="space-between" gap={4} mt={2}>
          <Stack
            direction={{ base: "column", sm: "row" }}
            fontSize="sm"
            gap={{ base: 1, sm: 2 }}
          >
            <Text color="foreground.subtle">{username}</Text>

            <Flex
              borderRadius="full"
              h={1}
              w={1}
              bgColor="foreground.subtle"
              display={{ base: "none", sm: "flex" }}
              placeSelf="center"
            />

            <Text color="foreground.subtle">
              {dayjs(isPending ? new Date() : createdAt).fromNow()}
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

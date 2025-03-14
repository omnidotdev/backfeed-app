"use client";

import { Badge, Flex, HStack, Stack, Text } from "@omnidev/sigil";
import dayjs from "dayjs";
import { match } from "ts-pattern";

import { convertFromSnakeCase } from "lib/util";

import type { HstackProps } from "@omnidev/sigil";
import type { FeedbackFragment } from "generated/graphql";

interface Props extends HstackProps {
  /** Feedback details. */
  feedback: Partial<FeedbackFragment>;
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
  feedback,
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
              {feedback.title}
            </Text>

            <HStack>
              <Badge
                variant="outline"
                color="brand.secondary"
                borderColor="brand.secondary"
              >
                {convertFromSnakeCase(feedback.status!)}
              </Badge>

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

        <Text color="foreground.muted">{feedback.description}</Text>

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

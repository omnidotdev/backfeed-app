"use client";

import { Flex, HStack, Icon, Stack, Text } from "@omnidev/sigil";
import dayjs from "dayjs";
import { HiOutlineFolder } from "react-icons/hi2";

import { StatusBadge } from "components/core";

import type { FlexProps } from "@omnidev/sigil";
import type { Post } from "generated/graphql";

interface Props extends FlexProps {
  /** Feedback details. */
  feedback: Partial<Post>;
}

/**
 * Recent feedback response.
 */
const Response = ({ feedback, ...rest }: Props) => {
  const startOfDay = dayjs(feedback?.createdAt).utc().startOf("day");

  const isToday = dayjs.duration(dayjs().utc().diff(startOfDay)).asDays() < 1;

  // NB: `isToday` is used to stabilize the relative time in order to keep in sync with `FeedbackOverview` calculations.
  const date = isToday
    ? dayjs(feedback?.createdAt).utc().fromNow()
    : startOfDay.fromNow();

  return (
    <Flex direction="column" gap={4} w="100%" {...rest}>
      <Flex direction="column" gap={2}>
        <Flex align="center" justify="space-between">
          <Text fontWeight="semibold" fontSize="sm" mb={1}>
            {feedback?.user?.username}
          </Text>

          <StatusBadge status={feedback?.status!} />
        </Flex>

        <Text fontSize="sm" color="foreground.subtle">
          {feedback?.description}
        </Text>
      </Flex>

      <HStack>
        <Text fontSize="xs" color="foreground.muted">
          {date}
        </Text>

        <HStack gap={1}>
          <Icon src={HiOutlineFolder} size="sm" />
          <Text fontSize="xs" color="foreground.muted">
            {feedback.project?.name}
          </Text>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default Response;

"use client";

import { Badge, Flex, Text } from "@omnidev/sigil";
import dayjs from "dayjs";

import { getResponseTypeColor } from "lib/util";

import type { Post } from "generated/graphql";
import type { ResponseType } from "lib/util";

interface Props {
  /** Feedback details. */
  feedback: Partial<Post>;
  /** Feedback type. */
  // TODO: remove and capture from `feedback` prop once discussed / db schema is updated
  type: ResponseType;
}

/**
 * Recent feedback response.
 */
const Response = ({ feedback, type }: Props) => {
  const color = getResponseTypeColor(type);

  const date = dayjs(feedback?.createdAt).fromNow();

  return (
    <Flex
      direction="column"
      gap={4}
      py={3}
      w="100%"
      borderBottomWidth={{ base: "1px", _last: 0 }}
    >
      <Flex direction="column">
        <Flex align="center" justify="space-between">
          <Text fontWeight="semibold" fontSize="sm" mb={1}>
            {feedback?.user?.username}
          </Text>

          <Badge color={color} borderColor={color}>
            {type}
          </Badge>
        </Flex>

        <Text fontSize="sm" color="foreground.subtle">
          {feedback?.description}
        </Text>
      </Flex>

      <Text fontSize="xs" color="foreground.muted">
        {date}
      </Text>
    </Flex>
  );
};

export default Response;

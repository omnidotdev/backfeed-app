"use client";

import { Badge, Flex, Text } from "@omnidev/sigil";
import { getResponseTypeColor } from "lib/util";

import type { ResponseType } from "lib/util";

// NB: this prop drilling is under the assumption that the query from parent won't provide much overhead (i.e. parent is isolated query and has minimal nesting / a response is a direct child)
interface Props {
  /** Feedback sender. */
  sender: string;
  /** Feedback message. */
  message: string;
  /** Date feedback was published. */
  date: string;
  /** Feedback type (i.e. category). */
  type: ResponseType;
}

/**
 * Recent feedback response.
 */
const Response = ({ sender, message, date, type }: Props) => {
  const color = getResponseTypeColor(type);

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
            {sender}
          </Text>

          <Badge color={color} borderColor={color}>
            {type}
          </Badge>
        </Flex>

        <Text fontSize="sm" color="foreground.subtle">
          {message}
        </Text>
      </Flex>

      <Text fontSize="xs" color="foreground.muted">
        {date}
      </Text>
    </Flex>
  );
};

export default Response;

"use client";

import { Badge, Flex, Text } from "@omnidev/sigil";
import dayjs from "dayjs";
import { match } from "ts-pattern";

import type { Post } from "generated/graphql";

// NB: tried to use an enum here but had difficulties with runtime errors
export type ResponseType = "Neutral" | "Positive" | "Bug" | "Feature";

// NB: this prop drilling is under the assumption that the query from parent won't provide much overhead (i.e. parent is isolated query and has minimal nesting / a response is a direct child)
interface Props {
  /** Feedback details. */
  feedback: Partial<Post>;
  /** Feedback type */
  type: ResponseType;
}

/**
 * Recent feedback response.
 */
const Response = ({ feedback, type }: Props) => {
  const color = match(type)
    .with("Neutral", () => "foreground.subtle")
    .with("Positive", () => "green")
    .with("Bug", () => "red")
    .with("Feature", () => "blue")
    .otherwise(() => "foreground.subtle");

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
            {feedback?.rowId}
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
        {dayjs(feedback?.createdAt).fromNow()}
      </Text>
    </Flex>
  );
};

export default Response;

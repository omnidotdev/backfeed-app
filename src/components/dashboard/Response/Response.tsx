"use client";

import { Badge, Flex, Text } from "@omnidev/sigil";
import dayjs from "dayjs";
import { match } from "ts-pattern";

// NB: tried to use an enum here but had difficulties with runtime errors
export type ResponseType = "Neutral" | "Positive" | "Bug" | "Feature";

// NB: this prop drilling is under the assumption that the query from parent won't provide much overhead (i.e. parent is isolated query and has minimal nesting / a response is a direct child)
interface Props {
  /** Feedback sender. */
  sender: string | undefined;
  /** Feedback message. */
  message: string | null | undefined;
  /** Date feedback was published. */
  date: Date | null | undefined;
  /** Feedback type (i.e. category). */
  type: ResponseType | undefined;
}

/**
 * Recent feedback response.
 */
const Response = ({ sender, message, date, type }: Props) => {
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
        {dayjs(date).fromNow()}
      </Text>
    </Flex>
  );
};

export default Response;

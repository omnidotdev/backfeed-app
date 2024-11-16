"use client";

import { Badge, Flex, Skeleton, Text } from "@omnidev/sigil";
import { match } from "ts-pattern";

// NB: tried to use an enum here but had difficulties with runtime errors
export type ResponseType = "Neutral" | "Positive" | "Bug" | "Feature";

// NB: this prop drilling is under the assumption that the query from parent won't provide much overhead (i.e. parent is isolated query and has minimal nesting / a response is a direct child)
interface Props {
  sender: string;
  message: string;
  date: string;
  type: ResponseType;
  isLoaded?: boolean;
}

/**
 * Recent feedback response.
 */
const Response = ({ sender, message, date, type, isLoaded = true }: Props) => {
  const color = match(type)
    .with("Neutral", () => "foreground.subtle")
    .with("Positive", () => "green")
    .with("Bug", () => "red")
    .with("Feature", () => "blue")
    .exhaustive();

  return (
    <Skeleton isLoaded={isLoaded} borderBottomWidth={{ base: "1px", _last: 0 }}>
      <Flex direction="column" gap={4} py={3} w="100%">
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
    </Skeleton>
  );
};

export default Response;

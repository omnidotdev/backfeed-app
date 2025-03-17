"use client";

import { Badge, Flex, Text } from "@omnidev/sigil";
import dayjs from "dayjs";

import type { FlexProps } from "@omnidev/sigil";
import type { Post } from "generated/graphql";

type ResponseType = "Neutral" | "Positive" | "Bug" | "Feature";

interface Props extends FlexProps {
  /** Feedback details. */
  feedback: Partial<Post>;
  /** Feedback type. */
  // TODO: remove and capture from `feedback` prop once discussed / db schema is updated
  type: ResponseType;
}

/**
 * Recent feedback response.
 */
const Response = ({ feedback, type, ...rest }: Props) => {
  const date = dayjs(feedback?.createdAt).fromNow();

  return (
    <Flex direction="column" gap={4} py={3} w="100%" {...rest}>
      <Flex direction="column" gap={2}>
        <Flex align="center" justify="space-between">
          <Text fontWeight="semibold" fontSize="sm" mb={1}>
            {feedback?.user?.username}
          </Text>

          <Badge>{type}</Badge>
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

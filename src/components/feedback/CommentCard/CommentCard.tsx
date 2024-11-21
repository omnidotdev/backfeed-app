import { Stack, Text, VStack } from "@omnidev/sigil";
import dayjs from "dayjs";

import type { StackProps } from "@omnidev/sigil";

interface Props extends StackProps {
  /** Comment sender. */
  senderName: string;
  /** Comment message. */
  message: string;
  /** Comment date. */
  date: string;
}

/**
 * Comment card.
 */
const Comment = ({ senderName, message, date, ...rest }: Props) => (
  <Stack
    direction="row"
    boxShadow="xs"
    borderRadius="sm"
    gap={4}
    p={4}
    {...rest}
  >
    <VStack
      justify="center"
      bgColor="background.subtle"
      borderRadius="full"
      p={2}
      h={8}
      w={8}
    >
      <Text color="foreground.muted">{senderName[0]}</Text>
    </VStack>

    <Stack gap={1} flex={1}>
      <Text fontWeight="semibold">{senderName}</Text>

      <Text fontSize="sm" color="foreground.subtle">
        {message}
      </Text>
    </Stack>

    <Text fontSize="sm" color="foreground.muted">
      {dayjs(date).fromNow()}
    </Text>
  </Stack>
);

export default Comment;

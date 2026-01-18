import { Flex, Icon, Stack, Text } from "@omnidev/sigil";
import dayjs from "dayjs";
import { HiOutlineFolder } from "react-icons/hi2";

import StatusBadge from "@/components/core/StatusBadge";

import type { FlexProps } from "@omnidev/sigil";
import type { Post } from "@/generated/graphql";

interface Props extends FlexProps {
  /** Feedback details. */
  feedback: Partial<Post>;
}

/**
 * Recent feedback response.
 */
const Response = ({ feedback, ...rest }: Props) => {
  const date = dayjs(feedback?.createdAt).utc().fromNow();

  return (
    <Stack gap={2} w="100%" {...rest}>
      <Flex align="center" justify="space-between" gap={2}>
        <Text fontWeight="medium" fontSize="sm" lineClamp={1} flex={1}>
          {feedback?.title}
        </Text>

        <StatusBadge status={feedback?.statusTemplate!} />
      </Flex>

      <Flex align="center" gap={3} fontSize="xs" color="foreground.subtle">
        <Flex align="center" gap={1}>
          <Icon src={HiOutlineFolder} w={3.5} h={3.5} />
          <Text lineClamp={1}>{feedback.project?.name}</Text>
        </Flex>

        <Text color="foreground.muted">·</Text>

        <Text>{date}</Text>
      </Flex>
    </Stack>
  );
};

export default Response;

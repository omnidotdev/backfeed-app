"use client";

import { Flex, HStack, Icon, Stack, Text } from "@omnidev/sigil";
import dayjs from "dayjs";
import {
  HiOutlineCalendar,
  HiOutlineFolder,
  HiOutlineUser,
} from "react-icons/hi2";

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
  const date = dayjs(feedback?.createdAt).utc().fromNow();

  return (
    <Stack gap={4} w="100%" {...rest}>
      <Stack gap={2}>
        <Flex justify="space-between">
          <Text
            fontWeight="semibold"
            fontSize="sm"
            mb={1}
            // TODO: figure out container queries for this. The sizing feels off across different pages on both the projects page and feedback page
            maxW={{ base: "25svw", xl: "md" }}
          >
            {feedback?.title}
          </Text>

          <StatusBadge status={feedback?.status!} />
        </Flex>

        <Text fontSize="sm" color="foreground.subtle">
          {feedback?.description}
        </Text>
      </Stack>

      {/* TODO: discuss possible issues with responsive design (i.e. long project name and/or long username) */}
      <HStack gap={2}>
        {[
          { icon: HiOutlineCalendar, text: date },
          { icon: HiOutlineFolder, text: feedback.project?.name },
          { icon: HiOutlineUser, text: feedback.user?.username },
        ].map((item) => (
          <HStack key={item.text} gap={1}>
            <Icon src={item.icon} size="sm" color="foreground.muted" />
            <Text fontSize="xs" color="foreground.muted">
              {item.text}
            </Text>
          </HStack>
        ))}
      </HStack>
    </Stack>
  );
};

export default Response;

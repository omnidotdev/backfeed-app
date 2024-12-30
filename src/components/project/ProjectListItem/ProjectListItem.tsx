"use client";

import { HStack, Icon, Stack, Text } from "@omnidev/sigil";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { OverflowText } from "components/core";

import type { Project } from "generated/graphql";

/**
 * Project list item.
 */
const ProjectListItem = ({ name, description, posts }: Partial<Project>) => {
  const AGGREGATES = [
    {
      type: "Users",
      icon: HiOutlineUserGroup,
      value: posts?.aggregates?.distinctCount?.userId ?? 0,
    },
    {
      type: "Responses",
      icon: HiOutlineChatBubbleLeftRight,
      value: posts?.totalCount ?? 0,
    },
  ];

  return (
    <Stack
      p={4}
      boxShadow="sm"
      borderWidth="1px"
      borderColor={{ base: "transparent", _hover: "border.subtle" }}
      borderRadius="sm"
      maxW="100%"
      mx="auto"
      h={36}
    >
      {/* TODO: discuss project statuses. Removed status badge for now as it is not a part of the current db schema. */}
      <OverflowText whiteSpace="nowrap" fontWeight="semibold" maxW="xl">
        {name}
      </OverflowText>

      <OverflowText whiteSpace="nowrap" color="foreground.subtle" maxW="xl">
        {description}
      </OverflowText>

      <HStack gap={4} mt={4} justifySelf="flex-end">
        {AGGREGATES.map(({ icon, value, type }) => (
          <HStack key={type} gap={1}>
            <Icon src={icon} w={5} h={5} color="foreground.subtle" />
            <Text
              fontSize="sm"
              color="foreground.subtle"
              fontVariant="tabular-nums"
            >
              {value}
            </Text>
          </HStack>
        ))}
      </HStack>
    </Stack>
  );
};

export default ProjectListItem;

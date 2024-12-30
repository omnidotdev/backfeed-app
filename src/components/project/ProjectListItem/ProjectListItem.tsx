"use client";

import {
  HStack,
  Icon,
  Skeleton,
  Stack,
  Text,
  useIsClient,
} from "@omnidev/sigil";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { OverflowText } from "components/core";
import { useDataState } from "lib/hooks";

import type { Project } from "generated/graphql";

/** Mock aggregates for the project. Will be replaced with real data, and fetched at this level in the future. */
const AGGREGATES = [
  {
    type: "Users",
    icon: HiOutlineUserGroup,
    value: 69,
  },
  {
    type: "Responses",
    icon: HiOutlineChatBubbleLeftRight,
    value: 420,
  },
];

/**
 * Project list item.
 */
const ProjectListItem = ({ name, description }: Partial<Project>) => {
  const isClient = useIsClient();

  const { isLoading, isError } = useDataState({ timeout: 500 });

  // NB: used to prevent status hydration issues on the client. Can be removed when status is fetched from the database.
  if (!isClient) return null;

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

            <Skeleton
              isLoaded={!isLoading}
              h={4}
              display="flex"
              alignItems="center"
              minW={6}
            >
              <Text
                fontSize="sm"
                color="foreground.subtle"
                fontVariant="tabular-nums"
              >
                {isError ? "Error" : value}
              </Text>
            </Skeleton>
          </HStack>
        ))}
      </HStack>
    </Stack>
  );
};

export default ProjectListItem;

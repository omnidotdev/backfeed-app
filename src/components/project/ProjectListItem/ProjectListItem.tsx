import { Badge, HStack, Icon, Skeleton, Stack, Text } from "@omnidev/sigil";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { match } from "ts-pattern";

import { useDataState } from "lib/hooks";

export interface Project {
  /** Project ID. */
  id: string;
  /** Project name. */
  name: string;
  /** Project description. */
  description: string;
  /** Project status. */
  status: "Active" | "Beta" | "Inactive";
}

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
 * Helper function to determine the colors used for the project status badge.
 */
const statusColor = (status: Project["status"]) =>
  match(status)
    .with("Active", () => "green")
    .with("Beta", () => "blue")
    .with("Inactive", () => "red")
    .exhaustive();

/**
 * Project list item.
 */
const ProjectListItem = ({ name, description, status }: Project) => {
  const { isLoading, isError } = useDataState({ timeout: 500 });

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
      <HStack>
        <Text fontWeight="semibold">{name}</Text>
        <Badge
          size="sm"
          variant="outline"
          color={statusColor(status)}
          borderColor={statusColor(status)}
        >
          {status}
        </Badge>
      </HStack>

      <Text
        color="foreground.subtle"
        maxW="xl"
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
      >
        {description}
      </Text>

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

import { Badge, HStack, Icon, Stack, Text } from "@omnidev/sigil";
import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
} from "react-icons/hi2";
import { match } from "ts-pattern";

import type { Project } from "components/project";

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
  const aggregates = [
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

  return (
    <Stack
      p={4}
      boxShadow="sm"
      borderWidth="1px"
      borderColor={{ base: "transparent", _hover: "border.subtle" }}
      borderRadius="sm"
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
        textWrap="nowrap"
        textOverflow="ellipsis"
      >
        {description}
      </Text>

      <HStack gap={4} mt={4}>
        {aggregates.map(({ icon, value, type }) => (
          <HStack key={type} gap={1}>
            <Icon src={icon} w={5} h={5} color="foreground.subtle" />

            <Text fontSize="sm" color="foreground.subtle">
              {value}
            </Text>
          </HStack>
        ))}
      </HStack>
    </Stack>
  );
};

export default ProjectListItem;

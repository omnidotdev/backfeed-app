import { HStack, Icon, Skeleton, Stack, Text } from "@omnidev/sigil";
import { HiOutlineFolder, HiOutlineUserGroup } from "react-icons/hi2";

import { OverflowText } from "components/core";
import { useDataState } from "lib/hooks";

export interface Organization {
  /** Organization ID. */
  id: string;
  /** Organization name. */
  name: string;
  /** Organization type. */
  type: string;
}

/** Mock aggregates for the organization. Will be replaced with real data, and fetched at this level in the future. */
const AGGREGATES = [
  {
    type: "Users",
    icon: HiOutlineUserGroup,
    value: 69,
  },
  {
    type: "Projects",
    icon: HiOutlineFolder,
    value: 420,
  },
];

/**
 * Organization list item.
 */
const OrganizationListItem = ({ name, type }: Organization) => {
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
      <OverflowText fontWeight="semibold" whiteSpace="nowrap">
        {name}
      </OverflowText>

      <OverflowText color="foreground.subtle" maxW="xl" whiteSpace="nowrap">
        {type}
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

export default OrganizationListItem;

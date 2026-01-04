import { HStack, Icon, Stack, Text } from "@omnidev/sigil";
import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import { HiOutlineFolder, HiOutlineUserGroup } from "react-icons/hi2";

import OverflowText from "@/components/core/OverflowText";
import setSingularOrPlural from "@/lib/util/setSingularOrPlural";

import type { Workspace } from "@/generated/graphql";

interface Props {
  /** Workspace details. */
  workspace: Partial<Workspace>;
}

/**
 * Workspace list item.
 */
const WorkspaceListItem = ({ workspace }: Props) => {
  const AGGREGATES = [
    {
      type: "user",
      icon: HiOutlineUserGroup,
      value: workspace?.members?.totalCount,
    },
    {
      type: "project",
      icon: HiOutlineFolder,
      value: workspace?.projects?.totalCount,
    },
  ];

  return (
    <Stack
      p={4}
      boxShadow="card"
      borderRadius="sm"
      w="full"
      maxW="100%"
      mx="auto"
      h={36}
      justify="space-between"
      position="relative"
    >
      <HStack alignItems="flex-start" justify="space-between">
        {/* ! NB: explicit maxW prevents overflow from pushing the dialog trigger outside of the container on smaller viewports */}
        <Stack maxW="65svw">
          <Link
            to="/workspaces/$workspaceSlug"
            params={{ workspaceSlug: workspace.slug! }}
            role="group"
          >
            <Stack gap={1}>
              <OverflowText
                fontWeight="semibold"
                whiteSpace="nowrap"
                color={{
                  base: "brand.primary.700",
                  _groupHover: {
                    base: "brand.primary.800",
                    _dark: "brand.primary.600",
                  },
                }}
              >
                {workspace?.name}
              </OverflowText>

              <Text
                fontSize="sm"
                color="foreground.muted"
              >{`Updated ${dayjs(workspace.updatedAt).fromNow()}`}</Text>
            </Stack>
          </Link>
        </Stack>
      </HStack>

      <HStack gap={4} mt={4} justifySelf="flex-end" flexWrap="wrap">
        {AGGREGATES.map(({ icon, value = 0, type }) => (
          <HStack key={type} gap={1} flexWrap="wrap">
            <Icon src={icon} w={5} h={5} color="foreground.subtle" />

            <Text
              fontSize="sm"
              color="foreground.subtle"
              fontVariant="tabular-nums"
            >
              {value} {setSingularOrPlural({ value, label: type })}
            </Text>
          </HStack>
        ))}
      </HStack>
    </Stack>
  );
};

export default WorkspaceListItem;

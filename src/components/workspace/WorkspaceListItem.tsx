import { HStack, Icon, Stack, Text, css } from "@omnidev/sigil";
import { Link } from "@tanstack/react-router";
import dayjs from "dayjs";
import { HiOutlineFolder } from "react-icons/hi2";

import OverflowText from "@/components/core/OverflowText";
import setSingularOrPlural from "@/lib/util/setSingularOrPlural";

/**
 * Workspace/org data shape for display purposes.
 * Organization data comes from JWT claims, not a local database table.
 */
interface WorkspaceData {
  rowId?: string;
  name?: string;
  slug?: string;
  organizationId?: string;
  updatedAt?: Date | string;
  projects?: {
    totalCount?: number;
  };
}

interface Props {
  /** Workspace details. */
  workspace: Partial<WorkspaceData>;
}

/**
 * Workspace list item.
 */
const WorkspaceListItem = ({ workspace }: Props) => {
  // Members are now managed via Gatekeeper IDP, not stored locally
  const AGGREGATES = [
    {
      type: "project",
      icon: HiOutlineFolder,
      value: workspace?.projects?.totalCount,
    },
  ];

  return (
    <Link
      to="/workspaces/$workspaceSlug"
      params={{ workspaceSlug: workspace.slug! }}
      role="group"
    >
      <Stack
        p={4}
        bgColor="card-item"
        borderRadius="xl"
        borderWidth="1px"
        borderColor={{ base: "neutral.200", _dark: "neutral.800" }}
        w="full"
        maxW="100%"
        mx="auto"
        h={36}
        justify="space-between"
        position="relative"
        cursor="pointer"
        className={css({
          transition: "all 0.2s ease",
          _groupHover: {
            bgColor: { base: "neutral.100", _dark: "neutral.800" },
          },
        })}
      >
        <HStack alignItems="flex-start" justify="space-between">
          <Stack maxW="65svw">
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
                {workspace.name}
              </OverflowText>

              {workspace.updatedAt && (
                <Text
                  fontSize="sm"
                  color="foreground.muted"
                >{`Updated ${dayjs(workspace.updatedAt).fromNow()}`}</Text>
              )}
            </Stack>
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
    </Link>
  );
};

export default WorkspaceListItem;

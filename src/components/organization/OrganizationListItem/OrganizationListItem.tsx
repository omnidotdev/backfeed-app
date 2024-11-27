import { HStack, Icon, Skeleton, Stack, Text } from "@omnidev/sigil";
import Link from "next/link";
import { HiOutlineFolder, HiOutlineUserGroup } from "react-icons/hi2";
import { RiUserSharedLine } from "react-icons/ri";

import { DestructiveAction, OverflowText } from "components/core";
import { app } from "lib/config";
import { useDataState } from "lib/hooks";

import type { DestructiveActionProps } from "components/core";

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

const deleteOrganization = app.organizationsPage.dialogs.deleteOrganization;
const leaveOrganization = app.organizationsPage.dialogs.leaveOrganization;

interface Props {
  /** Organization details. */
  organization: Organization;
  /** ! NB: this will be removed. Just used to implement dynamic ownership check for now. */
  index: number;
}

/**
 * Organization list item.
 */
const OrganizationListItem = ({
  organization: { id, name, type },
  index,
}: Props) => {
  const { isLoading, isError } = useDataState({ timeout: 500 });

  const isOrganizationOwner = index % 2 === 0;

  // NB: this could currently be pulled out of the component, but will need to be here when we provide appropriate action logic
  const DELETE_ORGANIZATION: DestructiveActionProps = {
    title: deleteOrganization.title,
    description: deleteOrganization.description,
    action: {
      // TODO: handle delete organization in onClick for primary action
      label: deleteOrganization.action.label,
    },
    triggerProps: {
      "aria-label": `${deleteOrganization.action.label} organization`,
      color: {
        base: "omni.ruby",
        _hover: {
          base: "omni.ruby.700",
          _dark: "omni.ruby.400",
        },
      },
    },
  };

  // NB: this could currently be pulled out of the component, but will need to be here when we provide appropriate action logic
  const LEAVE_ORGANIZATION: DestructiveActionProps = {
    title: leaveOrganization.title,
    description: leaveOrganization.description,
    icon: RiUserSharedLine,
    action: {
      // TODO: handle leave organization in onClick for primary action
      label: leaveOrganization.action.label,
    },
    triggerProps: {
      "aria-label": `${leaveOrganization.action.label} organization`,
      color: {
        base: "blue",
        _hover: {
          base: "blue.700",
          _dark: "blue.400",
        },
      },
    },
  };

  const DESTRUCTIVE_ACTION = isOrganizationOwner
    ? DELETE_ORGANIZATION
    : LEAVE_ORGANIZATION;

  return (
    <Stack
      p={4}
      boxShadow="sm"
      borderRadius="sm"
      w="full"
      maxW="100%"
      mx="auto"
      h={36}
    >
      <HStack alignItems="flex-start" justify="space-between">
        {/* ! NB: explicit maxW prevents overflow from pushing the dialog trigger outside of the container on smaller viewports */}
        <Stack maxW="65svw">
          <Link href={`/organizations/${id}`} role="group">
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
              {name}
            </OverflowText>
          </Link>

          <OverflowText color="foreground.subtle" maxW="xl" whiteSpace="nowrap">
            {type}
          </OverflowText>
        </Stack>

        <DestructiveAction {...DESTRUCTIVE_ACTION} />
      </HStack>

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

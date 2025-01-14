"use client";

import { HStack, Icon, Stack, Text } from "@omnidev/sigil";
import { HiOutlineFolder, HiOutlineUserGroup } from "react-icons/hi2";
import { RiUserSharedLine } from "react-icons/ri";

import { DestructiveAction, Link, OverflowText } from "components/core";
import {
  useDeleteOrganizationMutation,
  useLeaveOrganizationMutation,
} from "generated/graphql";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

import type { DestructiveActionProps } from "components/core";
import type { Organization } from "generated/graphql";

const deleteOrganizationDetails =
  app.organizationsPage.dialogs.deleteOrganization;
const leaveOrganizationDetails =
  app.organizationsPage.dialogs.leaveOrganization;

interface Props {
  /** Organization details. */
  organization: Partial<Organization>;
  /** ! TODO remove, just used to implement dynamic ownership check for now. */
  index: number;
}

/**
 * Organization list item.
 */
const OrganizationListItem = ({ organization, index }: Props) => {
  const { user } = useAuth();

  const isOrganizationOwner = index % 2 === 0;

  const { mutate: deleteOrganization } = useDeleteOrganizationMutation(),
    { mutate: leaveOrganization } = useLeaveOrganizationMutation();

  const AGGREGATES = [
    {
      type: "Users",
      icon: HiOutlineUserGroup,
      value: organization?.userOrganizations?.totalCount,
    },
    {
      type: "Projects",
      icon: HiOutlineFolder,
      value: organization?.projects?.totalCount,
    },
  ];

  const DELETE_ORGANIZATION: DestructiveActionProps = {
    title: deleteOrganizationDetails.title,
    description: deleteOrganizationDetails.description,
    action: {
      label: deleteOrganizationDetails.action.label,
      onClick: () => deleteOrganization({ rowId: organization?.rowId! }),
    },
    triggerProps: {
      "aria-label": `${deleteOrganizationDetails.action.label} organization`,
      color: "omni.ruby",
    },
  };

  const LEAVE_ORGANIZATION: DestructiveActionProps = {
    title: leaveOrganizationDetails.title,
    description: leaveOrganizationDetails.description,
    icon: RiUserSharedLine,
    action: {
      label: leaveOrganizationDetails.action.label,
      onClick: () =>
        leaveOrganization({
          organizationId: organization?.rowId!,
          userId: user?.hidraId!,
        }),
    },
    triggerProps: {
      "aria-label": `${leaveOrganizationDetails.action.label} organization`,
      color: "blue",
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
      justify="space-between"
    >
      <HStack alignItems="flex-start" justify="space-between">
        {/* ! NB: explicit maxW prevents overflow from pushing the dialog trigger outside of the container on smaller viewports */}
        <Stack maxW="65svw">
          <Link href={`/organizations/${organization?.slug}`} role="group">
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
              {organization?.name}
            </OverflowText>
          </Link>
        </Stack>

        <DestructiveAction {...DESTRUCTIVE_ACTION} />
      </HStack>

      <HStack gap={4} mt={4} justifySelf="flex-end">
        {AGGREGATES.map(({ icon, value = 0, type }) => (
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

export default OrganizationListItem;

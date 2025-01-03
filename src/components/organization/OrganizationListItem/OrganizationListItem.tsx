"use client";

import { HStack, Icon, Stack, Text } from "@omnidev/sigil";
import Link from "next/link";
import { HiOutlineFolder, HiOutlineUserGroup } from "react-icons/hi2";
import { RiUserSharedLine } from "react-icons/ri";

import { DestructiveAction, OverflowText } from "components/core";
import { app } from "lib/config";

import type { DestructiveActionProps } from "components/core";
import type { Organization } from "generated/graphql";

const deleteOrganization = app.organizationsPage.dialogs.deleteOrganization;
const leaveOrganization = app.organizationsPage.dialogs.leaveOrganization;

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
  const isOrganizationOwner = index % 2 === 0;

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
      color: "omni.ruby",
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

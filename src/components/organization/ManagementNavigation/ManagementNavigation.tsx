"use client";

import { Avatar, Button, Flex, Icon, Stack, Text } from "@omnidev/sigil";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { FiUserPlus } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";

import { OverflowText } from "components/core";
import { app } from "lib/config";
import { useOrganizationMembership } from "lib/hooks";

import type { ButtonProps, StackProps } from "@omnidev/sigil";
import type { Organization } from "generated/graphql";
import type { Session } from "next-auth";
import type { IconType } from "react-icons";

interface NavigationItem extends ButtonProps {
  /** Navigation item label. */
  label: string;
  /** Navigation item icon. */
  icon: IconType;
}

interface Props extends StackProps {
  /** Authenticated user. */
  user: Session["user"] | undefined;
  /** Organization ID. */
  organizationId: Organization["rowId"];
  /** Organization slug. */
  organizationSlug: string;
  /** Organization name */
  organizationName: string;
  /** Boolean indicating whether the sidebar is open. */
  isOpen: boolean;
  /** Callback function to close the sidebar. */
  onClose?: () => void;
  /** Boolean indicating whether text elements should be truncated. */
  truncateText?: boolean;
}

/**
 * Management navigation component.
 */
const ManagementNavigation = ({
  user,
  organizationId,
  organizationSlug,
  organizationName,
  isOpen,
  onClose,
  truncateText = false,
  ...rest
}: Props) => {
  const router = useRouter(),
    segment = useSelectedLayoutSegment();

  const { isMember, isAdmin } = useOrganizationMembership({
    userId: user?.rowId,
    organizationId,
  });

  const SIDEBAR_NAVIGATION: NavigationItem[] = [
    {
      label: app.organizationMembersPage.breadcrumb,
      icon: HiOutlineUserGroup,
      onClick: () => {
        onClose?.();
        router.push(`/organizations/${organizationSlug}/members`);
      },
    },
    {
      label: app.organizationInvitationsPage.breadcrumb,
      icon: FiUserPlus,
      onClick: () => {
        onClose?.();
        router.push(`/organizations/${organizationSlug}/invitations`);
      },
      disabled: !isAdmin,
    },
    {
      label: app.organizationSettingsPage.breadcrumb,
      icon: LuSettings,
      onClick: () => {
        onClose?.();
        router.push(`/organizations/${organizationSlug}/settings`);
      },
      disabled: !isMember,
    },
  ];

  return (
    <Stack gap={0} {...rest}>
      <Flex
        w="full"
        p={4}
        gap={2}
        bgColor={{ base: "brand.primary.50", _dark: "brand.primary.950" }}
        alignItems="center"
      >
        {/* TODO: update with organization image */}
        <Avatar size="xs" name={organizationName} />

        {isOpen && (
          <OverflowText
            as="h1"
            textAlign="center"
            whiteSpace="nowrap"
            fontSize="sm"
            fontWeight="semibold"
          >
            {organizationName}
          </OverflowText>
        )}
      </Flex>

      {SIDEBAR_NAVIGATION.filter(({ disabled }) => !disabled).map(
        ({ label, icon, onClick }) => (
          <Button
            key={label}
            variant="ghost"
            w="full"
            rounded="none"
            alignItems="center"
            justifyContent={isOpen ? "flex-start" : "center"}
            textAlign="left"
            textWrap="nowrap"
            py={6}
            bgColor={{
              _active: { base: "neutral.300a", _dark: "neutral.100a" },
              _hover: {
                base: "neutral.200a",
                _active: { base: "neutral.300a", _dark: "neutral.100a" },
              },
            }}
            onClick={onClick}
            // Need to flip to undefined if not on the current segment because `_active` still picks up "false" as a truthy value
            data-active={label.toLowerCase() === segment || undefined}
            aria-label={label}
          >
            <Icon src={icon} h={5} w={5} />

            {(isOpen || !truncateText) && <Text>{label}</Text>}
          </Button>
        ),
      )}
    </Stack>
  );
};

export default ManagementNavigation;

"use client";

import { Button, Icon, Stack, Text } from "@omnidev/sigil";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { LuSettings } from "react-icons/lu";

import { OverflowText } from "components/core";
import { app } from "lib/config";

import type { ButtonProps, StackProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface NavigationItem extends ButtonProps {
  /** Navigation item label. */
  label: string;
  /** Navigation item icon. */
  icon: IconType;
}

interface Props extends StackProps {
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
  organizationSlug,
  organizationName,
  isOpen,
  onClose,
  truncateText = false,
  ...rest
}: Props) => {
  const router = useRouter(),
    segment = useSelectedLayoutSegment();

  const SIDEBAR_NAVIGATION: NavigationItem[] = [
    {
      label: "Members",
      icon: HiOutlineUserGroup,
      onMouseDown: () => {
        onClose?.();
        router.push(`/organizations/${organizationSlug}/members`);
      },
    },
    {
      label: app.organizationSettingsPage.breadcrumb,
      icon: LuSettings,
      onMouseDown: () => {
        onClose?.();
        router.push(`/organizations/${organizationSlug}/settings`);
      },
    },
  ];

  return (
    <Stack gap={0} {...rest}>
      <OverflowText
        as="h1"
        p={4}
        bgColor={{ base: "brand.primary.50", _dark: "brand.primary.950" }}
        textAlign="center"
        whiteSpace="nowrap"
      >
        {isOpen || !truncateText ? organizationName : organizationName[0]}
      </OverflowText>

      {SIDEBAR_NAVIGATION.map(({ label, icon, onMouseDown }) => (
        <Button
          key={label}
          variant="ghost"
          w="full"
          rounded="none"
          alignItems="center"
          textWrap="nowrap"
          py={6}
          bgColor={{
            _active: { base: "neutral.300a", _dark: "neutral.100a" },
            _hover: {
              base: "neutral.200a",
              _active: { base: "neutral.300a", _dark: "neutral.100a" },
            },
          }}
          onMouseDown={onMouseDown}
          // Need to flip to undefined if not on the current segment because `_active` still picks up "false" as a truthy value
          data-active={label.toLowerCase() === segment || undefined}
          aria-label={label}
        >
          <Icon src={icon} h={5} w={5} />

          {(isOpen || !truncateText) && <Text>{label}</Text>}
        </Button>
      ))}
    </Stack>
  );
};

export default ManagementNavigation;

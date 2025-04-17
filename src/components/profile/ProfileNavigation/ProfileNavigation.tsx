"use client";

import { Button, Icon, Stack, Text } from "@omnidev/sigil";
import {
  useParams,
  useRouter,
  useSelectedLayoutSegment,
} from "next/navigation";
import { FiUserPlus, FiUser } from "react-icons/fi";
import { PiCreditCardLight } from "react-icons/pi";

import { OverflowText } from "components/core";
import { app } from "lib/config";

import type { ButtonProps, StackProps } from "@omnidev/sigil";
import type { User } from "generated/graphql";
import type { IconType } from "react-icons";

interface NavigationItem extends ButtonProps {
  /** Navigation item label. */
  label: string;
  /** Navigation item icon. */
  icon: IconType;
}

interface Props extends StackProps {
  /** Username. */
  username: User["username"];
  isOpen: boolean;
  /** Callback function to close the sidebar. */
  onClose?: () => void;
  /** Boolean indicating whether text elements should be truncated. */
  truncateText?: boolean;
}

/**
 * Management navigation component.
 */
const ProfileNavigation = ({
  username,
  isOpen,
  onClose,
  truncateText = false,
  ...rest
}: Props) => {
  const { userId } = useParams<{ userId: string }>();

  const router = useRouter(),
    segment = useSelectedLayoutSegment();

  const SIDEBAR_NAVIGATION: NavigationItem[] = [
    {
      label: app.profileAccountPage.breadcrumb,
      icon: FiUser,
      onClick: () => {
        onClose?.();
        router.push(`/profile/${userId}/account`);
      },
    },
    {
      label: app.profileInvitationsPage.breadcrumb,
      icon: FiUserPlus,
      onClick: () => {
        onClose?.();
        router.push(`/profile/${userId}/invitations`);
      },
    },
    {
      label: app.profileSubscriptionPage.breadcrumb,
      icon: PiCreditCardLight,
      onClick: () => {
        onClose?.();
        router.push(`/profile/${userId}/subscription`);
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
        {(isOpen || !truncateText) && username}
      </OverflowText>

      {SIDEBAR_NAVIGATION.map(({ label, icon, onClick }) => (
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
          onClick={onClick}
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

export default ProfileNavigation;

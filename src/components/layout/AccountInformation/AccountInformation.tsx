"use client";

import {
  Avatar,
  Button,
  Collapsible,
  HStack,
  Icon,
  Menu,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuSeparator,
  Stack,
  Text,
} from "@omnidev/sigil";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { FiLogOut, FiUser } from "react-icons/fi";
import { HiChevronUpDown } from "react-icons/hi2";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

import { useUserQuery } from "generated/graphql";
import { app, isDevEnv } from "lib/config";
import { useAuth, useViewportSize } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { DialogType } from "store";

import type { RefObject } from "react";

/**
 * User account information.
 */
const AccountInformation = () => {
  const router = useRouter();
  const { user } = useAuth();
  const isSmallViewport = useViewportSize({ minWidth: "40em" });

  const { data: username } = useUserQuery(
    {
      hidraId: user?.hidraId!,
    },
    {
      enabled: !!user?.hidraId,
      select: (data) => data?.userByHidraId?.username,
    },
  );

  const userActions = useRef<HTMLDivElement>(null);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);

  const { setIsOpen: setIsMobileSidebarOpen } = useDialogStore({
    type: DialogType.MobileSidebar,
  });

  const handleProfileClick = () => {
    setIsMobileProfileOpen(false);
    setIsMobileSidebarOpen(false);
    router.push(`/profile/${user?.hidraId}/account`);
  };

  useOnClickOutside(userActions as RefObject<HTMLElement>, () =>
    setIsMobileProfileOpen(false),
  );

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/federated-logout", {
        method: "POST",
      });

      await signOut();

      redirect("/");
    } catch (err) {
      if (isDevEnv) console.error(err);
    }
  };

  if (isSmallViewport) {
    return (
      <Menu
        trigger={
          <Button variant="ghost">
            <Avatar name={username} />
          </Button>
        }
        triggerProps={{
          px: 0,
          rounded: "full",
        }}
        positioning={{
          shift: 32,
        }}
      >
        <MenuItemGroup minW={32}>
          <MenuItemGroupLabel>{user?.name}</MenuItemGroupLabel>

          <MenuSeparator />

          <MenuItem value="profile" onClick={handleProfileClick}>
            <HStack gap={2}>
              <Icon src={FiUser} size="sm" />

              {app.auth.profile.label}
            </HStack>
          </MenuItem>

          <MenuSeparator />

          <MenuItem value="logout" onClick={handleLogout}>
            <HStack gap={2} color="red">
              <Icon src={FiLogOut} size="sm" color="red" />

              {app.auth.signOut.label}
            </HStack>
          </MenuItem>
        </MenuItemGroup>
      </Menu>
    );
  }

  return (
    <Stack ref={userActions} justifyContent="end">
      <Collapsible open={isMobileProfileOpen}>
        <Stack>
          <Button onClick={handleProfileClick}>
            <HStack gap={2}>
              <Icon src={FiUser} />

              {app.auth.profile.label}
            </HStack>
          </Button>

          <Button variant="outline" onClick={handleLogout} borderColor="red">
            <HStack gap={2} color="red">
              <Icon src={FiLogOut} size="sm" color="red" />

              {app.auth.signOut.label}
            </HStack>
          </Button>
        </Stack>
      </Collapsible>

      <Button
        justifyContent="space-between"
        variant="ghost"
        outline="1px solid"
        outlineColor="background.subtle"
        size="xl"
        onClick={() => setIsMobileProfileOpen(!isMobileProfileOpen)}
      >
        <HStack justifyContent="space-between" w="full">
          <HStack alignItems="center">
            <Avatar name={user?.name} />

            <Stack gap={1} textAlign="left">
              <Text lineHeight={1}>{user?.name}</Text>
              <Text fontSize="xs" lineHeight={1} color="foreground.muted">
                {user?.email}
              </Text>
            </Stack>
          </HStack>

          <Icon src={HiChevronUpDown} size="xl" />
        </HStack>
      </Button>
    </Stack>
  );
};

export default AccountInformation;

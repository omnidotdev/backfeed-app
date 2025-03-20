"use client";

import {
  Avatar,
  Button,
  Divider,
  HStack,
  Icon,
  Menu,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuSeparator,
  Text,
  Stack,
} from "@omnidev/sigil";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useMediaQuery } from "usehooks-ts";

import { app, isDevEnv } from "lib/config";
import { useAuth } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { DialogType } from "store";

/**
 * User account information.
 */
const AccountInformation = () => {
  // Used in favor of `useBreakpointValue` as the fallback to `base` breaks logic for initializing the render state of the menu
  const isSmallViewport = useMediaQuery("(min-width: 40em)");

  const router = useRouter(),
    { user } = useAuth(),
    { setIsOpen } = useDialogStore({
      type: DialogType.MobileSidebar,
    });

  const handleProfileClick = () => {
    setIsOpen(false);
    router.push(`/profile/${user?.rowId}`);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/federated-logout", {
        method: "POST",
      });

      await signOut();

      redirect("/");
    } catch (error) {
      if (isDevEnv) {
        console.error(error);
      }
    }
  };

  return isSmallViewport ? (
    <Menu
      trigger={
        <Button variant="ghost">
          <Avatar name={user?.name} />
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
  ) : (
    <Stack>
      <HStack gap={4} justify="center">
        <Avatar name={user?.name} />

        <Text>{user?.name}</Text>
      </HStack>

      <Divider my={1} />

      <Button onClick={handleProfileClick}>
        <HStack gap={2}>
          <Icon src={FiUser} size="sm" />

          {app.auth.profile.label}
        </HStack>
      </Button>

      <Button variant="outline" onClick={handleLogout}>
        <HStack gap={2} color="red">
          <Icon src={FiLogOut} size="sm" color="red" />

          {app.auth.signOut.label}
        </HStack>
      </Button>
    </Stack>
  );
};

export default AccountInformation;

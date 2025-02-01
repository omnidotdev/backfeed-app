"use client";

import {
  Avatar,
  Button,
  HStack,
  Icon,
  Menu,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuSeparator,
} from "@omnidev/sigil";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { FiLogOut, FiUser } from "react-icons/fi";

import { app, isDevEnv } from "lib/config";
import { useAuth } from "lib/hooks";

/**
 * User account information.
 */
const AccountInformation = () => {
  const router = useRouter();

  const { user } = useAuth();

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

  // TODO: handle closeOnSelect. Currently, the navigation seems to interfere with the menu item selection.
  return (
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
        shift: 24,
      }}
    >
      <MenuItemGroup minW={40}>
        <MenuItemGroupLabel>{user?.name}</MenuItemGroupLabel>

        <MenuSeparator />

        <MenuItem
          disabled
          value="profile"
          onClick={() => router.push("/user/profile")}
        >
          <HStack gap={2} color="foreground.subtle">
            <Icon src={FiUser} size="sm" color="foreground.subtle" />

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
};

export default AccountInformation;

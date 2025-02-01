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
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { FiLogOut, FiUser } from "react-icons/fi";
import { toast } from "sonner";

import { app } from "lib/config";
import { useAuth } from "lib/hooks";

/**
 * User account information.
 */
const AccountInformation = () => {
  const router = useRouter();

  const { user } = useAuth();

  const { mutateAsync: handleLogout } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/federated-logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to log out. Please try again.");
      }

      await signOut();
    },
    onError: (error) => toast.error(error.message),
    onSuccess: () => redirect("/"),
  });

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

        <MenuItem value="logout" onClick={async () => await handleLogout()}>
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

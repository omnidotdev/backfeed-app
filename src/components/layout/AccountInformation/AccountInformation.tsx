"use client";

import {
  Avatar,
  Badge,
  Button,
  HStack,
  Icon,
  Menu,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuSeparator,
} from "@omnidev/sigil";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

import { signOut } from "next-auth/react";
import { FiUser, FiLogOut } from "react-icons/fi";

const AccountInformation = () => {
  const { user } = useAuth();

  return (
    <Menu
      trigger={
        <Button variant="ghost">
          <Avatar name={user?.name} />
        </Button>
      }
    >
      <MenuItemGroup>
        <MenuItemGroupLabel>{user?.name}</MenuItemGroupLabel>

        <MenuSeparator />

        <MenuItem value="profile" disabled>
          <HStack gap={2} color="foreground.subtle">
            <Icon src={FiUser} size="sm" color="foreground.subtle" />
            {app.auth.profile.label}
            <Badge color="foreground.subtle">{app.info.comingSoon.label}</Badge>
          </HStack>
        </MenuItem>

        <MenuSeparator />

        <MenuItem value="logout" onClick={() => signOut()}>
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

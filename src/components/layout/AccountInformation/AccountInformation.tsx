"use client";

import { signOut } from "next-auth/react";

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

import { FiLogOut, FiUser } from "react-icons/fi";

/**
 * User account information.
 */
const AccountInformation = () => {
  const { user } = useAuth();

  const handleProfileClick = () => {
    // TODO fix upstream, then enable here (https://linear.app/omnidev/issue/OMNI-117/enable-client-redirects-in-user-account-management-page)
    // router.push(
    //   `${process.env.AUTH_KEYCLOAK_ISSUER}/account?referrer=backfeed-app&referrer_uri=${window.location.origin}`,
    // );
    //
    // TODO refresh updated profile claims (https://linear.app/omnidev/issue/OMNI-119/refresh-updated-profile-claims)
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/federated-logout");

      if (response.ok) {
        await signOut();

        const { url } = await response.json();

        window.location.href = url;
      }
    } catch (error) {
      console.error(error);
      window.location.href = "/";
    }
  };

  return (
    <Menu
      trigger={
        <Button variant="ghost">
          <Avatar name={user?.name} />
        </Button>
      }
      triggerProps={{
        px: 0,
      }}
    >
      <MenuItemGroup>
        <MenuItemGroupLabel>{user?.name}</MenuItemGroupLabel>

        <MenuSeparator />

        <MenuItem disabled value="profile" onClick={handleProfileClick}>
          <HStack gap={2} color="foreground.subtle">
            <Icon src={FiUser} size="sm" color="foreground.subtle" />
            {app.auth.profile.label}

            <Badge color="foreground.subtle">{app.info.comingSoon.label}</Badge>
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

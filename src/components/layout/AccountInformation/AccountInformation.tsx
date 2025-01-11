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

  const handleLogout = () => {
    signOut();
    // TODO fix, backchannel logout not working (only logging out on client, can test by trying to login shortly after logging out, notice no redirect to log in) (https://linear.app/omnidev/issue/OMNI-118/fix-backchannel-logout-not-working)
    // https://github.com/nextauthjs/next-auth/discussions/3938
    // const keycloakUrl = `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/logout?client_id=${process.env.AUTH_KEYCLOAK_ID}&redirect_uri=${encodeURIComponent(window.location.origin)}`;
    // const keycloakUrl = `https://hidra.omni.dev/realms/test/protocol/openid-connect/logout?client_id=backfeed-app&redirect_uri=${"http://localhost:3000/api/auth/callback/keycloak"}`;
    // router.push(keycloakUrl);

    // redirect to Keycloak logout
    // window.location.href = keycloakUrl;
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

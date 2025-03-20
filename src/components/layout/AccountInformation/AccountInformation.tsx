"use client";

import {
  Avatar,
  Badge,
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
import { redirect } from "next/navigation";
import { FiLogOut, FiUser } from "react-icons/fi";
import { useMediaQuery } from "usehooks-ts";

import { app, isDevEnv } from "lib/config";
import { useAuth } from "lib/hooks";

/**
 * User account information.
 */
const AccountInformation = () => {
  // Used in favor of `useBreakpointValue` as the fallback to `base` breaks logic for initializing the render state of the menu
  const isSmallViewport = useMediaQuery("(min-width: 40em)");

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
        shift: 20,
      }}
    >
      <MenuItemGroup>
        <MenuItemGroupLabel>{user?.name}</MenuItemGroupLabel>

        <MenuSeparator />

        <MenuItem
          value="profile"
          onClick={handleProfileClick}
          // TODO: remove all styles below once enabled
          disabled
          backgroundColor={{ _disabled: "inherit" }}
          opacity={0.5}
          cursor="not-allowed"
        >
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
  ) : (
    <Stack>
      <HStack gap={4} justify="center">
        <Avatar name={user?.name} />

        <Text>{user?.name}</Text>
      </HStack>

      <Divider my={1} />

      <Button
        onClick={handleProfileClick}
        // TODO: remove all styles below once enabled
        disabled
        backgroundColor={{ _disabled: "inherit" }}
        opacity={0.5}
        cursor="not-allowed"
      >
        <HStack gap={2} color="foreground.subtle">
          <Icon src={FiUser} size="sm" color="foreground.subtle" />

          {app.auth.profile.label}

          <Badge color="foreground.subtle">{app.info.comingSoon.label}</Badge>
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

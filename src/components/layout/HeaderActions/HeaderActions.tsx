"use client";

import {
  Button,
  Flex,
  HStack,
  Icon,
  Menu,
  MenuItem,
  MenuItemGroup,
} from "@omnidev/sigil";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RiMenu3Fill } from "react-icons/ri";
import { useMediaQuery } from "usehooks-ts";

import { AccountInformation, ThemeToggle } from "components/layout";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

/**
 * Header actions.
 */
const HeaderActions = () => {
  // Used in favor of `useBreakpointValue` as the fallback to `base` breaks logic for initializing the render state of the menu
  const isSmallViewport = useMediaQuery("(min-width: 40em)");

  const router = useRouter(),
    { isAuthenticated, isLoading } = useAuth();

  const handleSignUp = () => {
    // use custom URL because Auth.js doesn't have built-in support for direct registration flows
    const signUpUrl = `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/registrations?client_id=${process.env.AUTH_KEYCLOAK_ID}&redirect_uri=${window.location.origin}/auth/callback/keycloak&response_type=code`;

    router.push(signUpUrl);
  };

  if (isLoading) return null;

  return (
    <Flex alignItems="center" gap={4}>
      <ThemeToggle />

      {isAuthenticated ? (
        <AccountInformation />
      ) : isSmallViewport ? (
        <HStack>
          <Button onClick={() => signIn("omni")} variant="outline">
            {app.auth.signIn.label}
          </Button>

          <Button onClick={handleSignUp}>{app.auth.signUp.label}</Button>
        </HStack>
      ) : (
        <Menu
          unmountOnExit
          trigger={
            <Button variant="icon">
              <Icon src={RiMenu3Fill} />
            </Button>
          }
          positioning={{
            shift: 32,
          }}
        >
          <MenuItemGroup minW={32}>
            <MenuItem value="signIn" onClick={() => signIn("omni")} asChild>
              <Button variant="outline">{app.auth.signIn.label}</Button>
            </MenuItem>

            <MenuItem value="signUp" onClick={handleSignUp} asChild>
              <Button>{app.auth.signUp.label}</Button>
            </MenuItem>
          </MenuItemGroup>
        </Menu>
      )}
    </Flex>
  );
};

export default HeaderActions;

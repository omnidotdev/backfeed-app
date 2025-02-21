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

import { AccountInformation, ThemeToggle } from "components/layout";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

/**
 * Header actions.
 */
const HeaderActions = () => {
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
      ) : (
        <>
          <Menu
            trigger={
              <Button variant="icon" display={{ base: "flex", sm: "none" }}>
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

          <HStack display={{ base: "none", sm: "flex" }}>
            <Button onClick={() => signIn("omni")} variant="outline">
              {app.auth.signIn.label}
            </Button>

            <Button onClick={handleSignUp}>{app.auth.signUp.label}</Button>
          </HStack>
        </>
      )}
    </Flex>
  );
};

export default HeaderActions;

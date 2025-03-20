"use client";

import {
  Button,
  Divider,
  Drawer,
  Flex,
  HStack,
  Icon,
  Stack,
} from "@omnidev/sigil";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";
import { RiMenu3Fill } from "react-icons/ri";
import { useMediaQuery } from "usehooks-ts";

import { AccountInformation, ThemeToggle } from "components/layout";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { DialogType } from "store";

import type { CSSProperties } from "react";

const sharedStyles: CSSProperties = {
  all: "unset",
  top: 80,
  left: 0,
  position: "fixed",
  width: "100%",
  height: "calc(100vh - 80px)",
};

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

  const { isOpen, setIsOpen } = useDialogStore({
    type: DialogType.MobileSidebar,
  });

  if (isLoading) return null;

  return (
    <Flex alignItems="center" gap={4}>
      <ThemeToggle />

      {isSmallViewport ? (
        isAuthenticated ? (
          <AccountInformation />
        ) : (
          <HStack>
            <Button onClick={() => signIn("omni")} variant="outline">
              {app.auth.signIn.label}
            </Button>

            <Button onClick={handleSignUp}>{app.auth.signUp.label}</Button>
          </HStack>
        )
      ) : (
        <>
          <Button variant="icon" onClick={() => setIsOpen(!isOpen)}>
            <Icon src={isOpen ? FiX : RiMenu3Fill} />
          </Button>

          <Drawer
            unmountOnExit
            modal={false}
            closeOnInteractOutside={false}
            open={isOpen}
            onOpenChange={({ open }) => {
              setIsOpen(open);
            }}
            backdropProps={{ style: sharedStyles }}
            positionerProps={{ style: sharedStyles }}
          >
            <Stack p={0} h="full" flex={1}>
              {!isLoading && !isAuthenticated && (
                <Stack>
                  <Button
                    onClick={() => {
                      setIsOpen(!isOpen);
                      router.push("/pricing");
                    }}
                    variant="ghost"
                  >
                    {app.header.routes.pricing.label}
                  </Button>

                  <Divider my={1} />
                </Stack>
              )}

              {isAuthenticated ? (
                <AccountInformation />
              ) : (
                <Stack>
                  <Button variant="outline" onClick={() => signIn("omni")}>
                    {app.auth.signIn.label}
                  </Button>

                  <Button onClick={handleSignUp}>
                    {app.auth.signUp.label}
                  </Button>
                </Stack>
              )}
            </Stack>
          </Drawer>
        </>
      )}
    </Flex>
  );
};

export default HeaderActions;

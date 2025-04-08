"use client";

import {
  Button,
  Drawer,
  DrawerCloseTrigger,
  Flex,
  HStack,
  Icon,
  Stack,
} from "@omnidev/sigil";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { RiMenu3Fill } from "react-icons/ri";

import { LogoLink } from "components/core";
import {
  AccountInformation,
  SidebarNavigation,
  ThemeToggle,
} from "components/layout";
import { app } from "lib/config";
import { useAuth, useViewportSize } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { DialogType } from "store";

/**
 * Header actions.
 */
const HeaderActions = () => {
  const isSmallViewport = useViewportSize({ minWidth: "40em" });

  const router = useRouter(),
    { isAuthenticated, isLoading } = useAuth(),
    { isOpen: isMobileSidebarOpen, setIsOpen: setIsMobileSidebarOpen } =
      useDialogStore({
        type: DialogType.MobileSidebar,
      });

  const handleSignUp = () => {
    // use custom URL because Auth.js doesn't have built-in support for direct registration flows
    const signUpUrl = `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/registrations?client_id=${process.env.AUTH_KEYCLOAK_ID}&redirect_uri=${window.location.origin}/auth/callback/keycloak&response_type=code`;

    router.push(signUpUrl);
  };

  useEffect(() => {
    if (isSmallViewport) {
      setIsMobileSidebarOpen(false);
    }
  }, [isSmallViewport, setIsMobileSidebarOpen]);

  if (isLoading) return null;

  if (isSmallViewport) {
    return (
      <Flex alignItems="center" gap={4}>
        <ThemeToggle />

        {isAuthenticated ? (
          <AccountInformation />
        ) : (
          <HStack>
            <Button variant="outline" onMouseDown={() => signIn("omni")}>
              {app.auth.signIn.label}
            </Button>

            <Button onMouseDown={handleSignUp}>{app.auth.signUp.label}</Button>
          </HStack>
        )}
      </Flex>
    );
  }

  return (
    <Flex alignItems="center" gap={4}>
      <ThemeToggle />

      <Drawer
        open={isMobileSidebarOpen}
        onOpenChange={({ open }) => {
          setIsMobileSidebarOpen(open);
        }}
        trigger={
          <Button
            variant="ghost"
            bgColor={{
              base: "background.subtle",
              _hover: "background.muted/80",
            }}
            p={0}
          >
            <Icon src={RiMenu3Fill} h={5} w={5} />
          </Button>
        }
        contentProps={{ boxShadow: "card" }}
      >
        <Flex justifyContent="space-between">
          <ThemeToggle />

          <DrawerCloseTrigger asChild>
            <Button
              variant="ghost"
              bgColor="background.muted"
              p={1}
              aria-label="Close Mobile Sidebar"
            >
              <Icon src={FiX} />
            </Button>
          </DrawerCloseTrigger>
        </Flex>

        <Stack h="full" flex={1} justify="space-between">
          <Stack mt={4} align="center">
            <LogoLink
              width={60}
              flexDirection="column"
              onMouseDown={() => setIsMobileSidebarOpen(false)}
            />

            {!isLoading && <SidebarNavigation />}
          </Stack>

          {isAuthenticated ? (
            <AccountInformation />
          ) : (
            <Stack>
              <Button variant="outline" onMouseDown={() => signIn("omni")}>
                {app.auth.signIn.label}
              </Button>

              <Button onMouseDown={handleSignUp}>
                {app.auth.signUp.label}
              </Button>
            </Stack>
          )}
        </Stack>
      </Drawer>
    </Flex>
  );
};

export default HeaderActions;

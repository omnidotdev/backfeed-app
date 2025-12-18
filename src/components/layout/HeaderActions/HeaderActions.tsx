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
import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { RiMenu3Fill } from "react-icons/ri";

import { LogoLink } from "components/core";
import {
  AccountInformation,
  SidebarNavigation,
  ThemeToggle,
} from "components/layout";
import { NotificationCenter } from "components/notifications";
import { token } from "generated/panda/tokens";
import signIn from "lib/auth/signIn";
import { BASE_URL, app } from "lib/config";
import { useAuth, useViewportSize } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { DialogType } from "store";

/**
 * Header actions.
 */
const HeaderActions = () => {
  const isSmallViewport = useViewportSize({
    minWidth: token("breakpoints.sm"),
  });

  const { isAuthenticated, isLoading } = useAuth(),
    { isOpen: isMobileSidebarOpen, setIsOpen: setIsMobileSidebarOpen } =
      useDialogStore({
        type: DialogType.MobileSidebar,
      });

  const handleSignUp = () => {
    signIn({ redirectUrl: BASE_URL! });
  };

  useEffect(() => {
    if (isSmallViewport) {
      setIsMobileSidebarOpen(false);
    }
  }, [isSmallViewport, setIsMobileSidebarOpen]);

  if (isLoading) return null;

  if (isSmallViewport) {
    return (
      <Flex alignItems="center" gap={1}>
        <ThemeToggle />

        {isAuthenticated ? (
          <HStack>
            <NotificationCenter />

            <AccountInformation />
          </HStack>
        ) : (
          <HStack>
            <Button
              variant="outline"
              onClick={() => signIn({ redirectUrl: BASE_URL! })}
            >
              {app.auth.signIn.label}
            </Button>

            <Button onClick={handleSignUp}>{app.auth.signUp.label}</Button>
          </HStack>
        )}
      </Flex>
    );
  }

  return (
    <Flex alignItems="center" gap={1}>
      <ThemeToggle />

      <HStack>
        {isAuthenticated && <NotificationCenter />}

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
                onClick={() => setIsMobileSidebarOpen(false)}
              />

              {!isLoading && <SidebarNavigation />}
            </Stack>

            {isAuthenticated ? (
              <AccountInformation />
            ) : (
              <Stack>
                <Button
                  variant="outline"
                  onClick={() => signIn({ redirectUrl: BASE_URL! })}
                >
                  {app.auth.signIn.label}
                </Button>

                <Button onClick={handleSignUp}>{app.auth.signUp.label}</Button>
              </Stack>
            )}
          </Stack>
        </Drawer>
      </HStack>
    </Flex>
  );
};

export default HeaderActions;

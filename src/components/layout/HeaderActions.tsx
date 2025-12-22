import {
  Button,
  Drawer,
  DrawerCloseTrigger,
  Flex,
  HStack,
  Icon,
  Stack,
} from "@omnidev/sigil";
import { useRouteContext } from "@tanstack/react-router";
import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { RiMenu3Fill } from "react-icons/ri";
import { useIsClient } from "usehooks-ts";

import LogoLink from "@/components/core/LogoLink";
import AccountInformation from "@/components/layout/AccountInformation";
import SidebarNavigation from "@/components/layout/SidebarNavigation";
import ThemeToggle from "@/components/layout/ThemeToggle";
import NotificationCenter from "@/components/notifications/NotificationsCenter";
import { token } from "@/generated/panda/tokens";
import signIn from "@/lib/auth/signIn";
import app from "@/lib/config/app.config";
import { BASE_URL } from "@/lib/config/env.config";
import useViewportSize from "@/lib/hooks/useViewportSize";
import useDialogStore, { DialogType } from "@/lib/store/useDialogStore";

/**
 * Header actions.
 */
const HeaderActions = () => {
  const isClient = useIsClient();
  const { session } = useRouteContext({ from: "__root__" });

  const isSmallViewport = useViewportSize({
    minWidth: token("breakpoints.sm"),
  });

  const { isOpen: isMobileSidebarOpen, setIsOpen: setIsMobileSidebarOpen } =
    useDialogStore({
      type: DialogType.MobileSidebar,
    });

  useEffect(() => {
    if (isSmallViewport) {
      setIsMobileSidebarOpen(false);
    }
  }, [isSmallViewport, setIsMobileSidebarOpen]);

  if (!isClient) return null;

  if (isSmallViewport) {
    return (
      <Flex alignItems="center" gap={1}>
        <ThemeToggle />

        {session ? (
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

            <Button onClick={() => signIn({ redirectUrl: BASE_URL! })}>
              {app.auth.signUp.label}
            </Button>
          </HStack>
        )}
      </Flex>
    );
  }

  return (
    <Flex alignItems="center" gap={1}>
      <ThemeToggle />

      <HStack>
        {session && <NotificationCenter />}

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

              <SidebarNavigation />
            </Stack>

            {session ? (
              <AccountInformation />
            ) : (
              <Stack>
                <Button
                  variant="outline"
                  onClick={() => signIn({ redirectUrl: BASE_URL! })}
                >
                  {app.auth.signIn.label}
                </Button>

                <Button onClick={() => signIn({ redirectUrl: BASE_URL! })}>
                  {app.auth.signUp.label}
                </Button>
              </Stack>
            )}
          </Stack>
        </Drawer>
      </HStack>
    </Flex>
  );
};

export default HeaderActions;

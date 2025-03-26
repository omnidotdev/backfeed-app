"use client";

import {
  Badge,
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

import { Image, Link } from "components/core";
import { AccountInformation, ThemeToggle } from "components/layout";
import { app } from "lib/config";
import { useAuth, useRoutes, useViewportSize } from "lib/hooks";
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

  const routes = useRoutes();

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
            <Button variant="outline" onClick={() => signIn("omni")}>
              {app.auth.signIn.label}
            </Button>

            <Button onClick={handleSignUp}>{app.auth.signUp.label}</Button>
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
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Icon src={RiMenu3Fill} h={5} w={5} />
          </Button>
        }
        positionerProps={{
          width: "80%",
        }}
        contentProps={{ boxShadow: "card" }}
      >
        <DrawerCloseTrigger asChild position="absolute" top={3} right={3}>
          <Button
            variant="ghost"
            bgColor="background.muted"
            p={1}
            aria-label="Close Mobile Sidebar"
          >
            <Icon src={FiX} />
          </Button>
        </DrawerCloseTrigger>

        <Stack p={0} h="full" flex={1} justify="space-between">
          <Stack mt={24} gap={8} align="center">
            <Stack gap={3} alignItems="center">
              <Image
                src="/img/logo.png"
                alt={`${app.name} logo`}
                width={120}
                height={60}
                priority
                // adjust color based on color theme
                mixBlendMode="difference"
                filter="brightness(0) invert(1)"
              />

              <Badge
                size="sm"
                fontSize="xs"
                variant="outline"
                color="brand.primary"
                borderColor="brand.primary"
                px={2}
              >
                Beta
              </Badge>
            </Stack>

            {!isLoading && (
              <Flex direction="column" w="full" gap={4}>
                {routes.map(({ href, label, isActive }) => (
                  <Link
                    key={href}
                    disabled={isActive}
                    href={href}
                    role="group"
                    onClick={() => setIsMobileSidebarOpen(false)}
                  >
                    <Button
                      disabled={isActive}
                      variant="ghost"
                      bgColor={{
                        base: "background.subtle",
                        _hover: "background.muted",
                      }}
                      w="full"
                      tabIndex={-1}
                      color={isActive ? "brand.primary" : "inherit"}
                    >
                      {label}
                    </Button>
                  </Link>
                ))}
              </Flex>
            )}

            <ThemeToggle />
          </Stack>

          {isAuthenticated ? (
            <AccountInformation />
          ) : (
            <Stack>
              <Button variant="outline" onClick={() => signIn("omni")}>
                {app.auth.signIn.label}
              </Button>

              <Button onClick={handleSignUp}>{app.auth.signUp.label}</Button>
            </Stack>
          )}
        </Stack>
      </Drawer>
    </Flex>
  );
};

export default HeaderActions;

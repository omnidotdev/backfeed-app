"use client";

import { Button, Drawer, Flex, HStack, Icon, Stack } from "@omnidev/sigil";
import { signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { RiMenu3Fill } from "react-icons/ri";
import { match } from "ts-pattern";

import { Link } from "components/core";
import { AccountInformation, ThemeToggle } from "components/layout";
import { app } from "lib/config";
import { useAuth, useIsSmallViewport } from "lib/hooks";
import { useDialogStore } from "lib/hooks/store";
import { DialogType } from "store";

/**
 * Header actions.
 */
const HeaderActions = () => {
  const isSmallViewport = useIsSmallViewport();

  const router = useRouter(),
    pathname = usePathname(),
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

  return (
    <Flex alignItems="center" gap={4}>
      <ThemeToggle />

      {match(isSmallViewport)
        .with(true, () =>
          isAuthenticated ? (
            <AccountInformation />
          ) : (
            <HStack>
              <Button variant="outline" onClick={() => signIn("omni")}>
                {app.auth.signIn.label}
              </Button>

              <Button onClick={handleSignUp}>{app.auth.signUp.label}</Button>
            </HStack>
          )
        )
        .with(false, () => (
          <Drawer
            unmountOnExit
            modal={false}
            closeOnInteractOutside={false}
            open={isMobileSidebarOpen}
            onOpenChange={({ open }) => {
              setIsMobileSidebarOpen(open);
            }}
            trigger={
              <Button
                variant="icon"
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              >
                <Icon src={isMobileSidebarOpen ? FiX : RiMenu3Fill} />
              </Button>
            }
            backdropProps={{
              style: {
                top: 80,
                height: "calc(100vh - 80px)",
              },
            }}
            positionerProps={{
              style: {
                top: 80,
                height: "calc(100vh - 80px)",
              },
            }}
          >
            <Stack h="full" flex={1}>
              {!isLoading && !isAuthenticated && (
                <Stack>
                  <Link
                    href="/pricing"
                    role="group"
                    onClick={() => setIsMobileSidebarOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      w="full"
                      tabIndex={-1}
                      color={
                        pathname === "/pricing" ? "brand.primary" : "inherit"
                      }
                    >
                      {app.header.routes.pricing.label}
                    </Button>
                  </Link>

                  {/* <Divider my={1} /> */}
                </Stack>
              )}

              {isAuthenticated ? (
                <AccountInformation />
              ) : (
                <Stack justify="flex-end">
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
        ))
        .exhaustive()}
    </Flex>
  );
};

export default HeaderActions;

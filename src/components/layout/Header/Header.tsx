"use client";

import { Button, Flex, HStack, Icon, Text, sigil } from "@omnidev/sigil";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LuMessageSquarePlus } from "react-icons/lu";

import { AccountInformation, ThemeToggle } from "components/layout";
import { token } from "generated/panda/tokens";
import { app, navigationRoutes } from "lib/config";
import { useAuth } from "lib/hooks";
import { signIn } from "next-auth/react";
import { Spinner } from "components/core";

/**
 * Layout header.
 */
const Header = () => {
  const router = useRouter(),
    pathname = usePathname(),
    { isAuthenticated, isLoading } = useAuth();

  // TODO: make dynamic based on the current route
  const { landingPage, dashboardPage } = navigationRoutes;

  const headerRoutes = isAuthenticated ? dashboardPage : landingPage;

  const handleSignUp = () => {
    // use custom URL because Auth.js doesn't have built-in support for direct registration flows
    const signUpUrl = `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/registrations?client_id=${process.env.AUTH_KEYCLOAK_ID}&redirect_uri=${window.location.origin}/auth/callback/keycloak&response_type=code`;

    router.push(signUpUrl);
  };

  return (
    <sigil.header
      display="flex"
      h={16}
      p={4}
      // TODO: discuss why this style prop is necessary
      style={{
        borderBottom: "1px solid",
        borderColor: token("colors.border.subtle"),
        backgroundColor: token("colors.background.default"),
      }}
    >
      <Flex align="center" justify="space-between" w="full" mx="auto" px={4}>
        <Flex gap={4} alignItems="center">
          <Link href="/">
            <HStack gap={2} alignItems="center">
              <Icon src={LuMessageSquarePlus} w={6} h={6} />

              <Text
                fontWeight="bold"
                fontSize="lg"
                display={{ base: "none", md: "block" }}
              >
                {app.name}
              </Text>
            </HStack>
          </Link>

          {headerRoutes.map(({ label, href }) => {
            const isActive = pathname === href;

            return (
              <Link key={href} href={href} role="group">
                <Flex
                  h={10}
                  px={4}
                  align="center"
                  color={{
                    base: "foreground.muted",
                    _groupHover: "foreground.default",
                  }}
                  bgColor={isActive ? "background.muted" : "transparent"}
                  borderRadius="md"
                >
                  {label}
                </Flex>
              </Link>
            );
          })}
        </Flex>

        <Flex alignItems="center" gap={6}>
          <ThemeToggle />

          {isLoading ? (
            <Spinner />
          ) : isAuthenticated ? (
            <AccountInformation />
          ) : (
            <HStack>
              <Button onClick={() => signIn("keycloak")} variant="outline">
                {app.auth.signIn.label}
              </Button>

              <Button onClick={handleSignUp}>{app.auth.signUp.label}</Button>
            </HStack>
          )}
        </Flex>
      </Flex>
    </sigil.header>
  );
};

export default Header;

"use client";

import { Button, Flex, HStack, Icon, Text, sigil } from "@omnidev/sigil";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuMessageSquarePlus } from "react-icons/lu";

import { ThemeToggle } from "components/layout";
import { token } from "generated/panda/tokens";
import { app, navigationRoutes } from "lib/config";
import { useIsTablet } from "lib/hooks";

/**
 * Layout header.
 */
const Header = () => {
  const pathname = usePathname();

  const isTablet = useIsTablet();

  // TODO: make dynamic based on the current route and auth status
  const { landingPage } = navigationRoutes;

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
              {isTablet && (
                <Text fontWeight="bold" fontSize="lg">
                  {app.name}
                </Text>
              )}
            </HStack>
          </Link>

          {landingPage.map(({ label, href }) => {
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

          <Button>Get Started</Button>
        </Flex>
      </Flex>
    </sigil.header>
  );
};

export default Header;

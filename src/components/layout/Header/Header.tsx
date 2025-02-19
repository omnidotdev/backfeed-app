"use client";

import { Flex, HStack, Icon, Text, css, sigil } from "@omnidev/sigil";
import { usePathname } from "next/navigation";
import { LuMessageSquarePlus } from "react-icons/lu";

import { Link } from "components/core";
import { HeaderActions } from "components/layout";
import { app, navigationRoutes } from "lib/config";
import { useAuth } from "lib/hooks";

/**
 * Layout header.
 */
const Header = () => {
  const pathname = usePathname(),
    { isAuthenticated, isLoading } = useAuth();

  // TODO: make dynamic based on the current route
  const { landingPage, dashboardPage } = navigationRoutes;

  const headerRoutes = isAuthenticated ? dashboardPage : landingPage;

  return (
    <sigil.header
      display="flex"
      h={20}
      p={2}
      // TODO: fix styles not appropriately being applied, See: https://linear.app/omnidev/issue/OMNI-109/look-into-panda-css-styling-issues
      className={css({
        borderBottom: "1px solid",
        borderColor: "border.subtle",
        backgroundColor: "background.default",
      })}
    >
      <Flex align="center" justify="space-between" w="full" mx="auto" px={4}>
        <Flex gap={{ base: 2, md: 4 }} alignItems="center">
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

          {!isLoading &&
            headerRoutes.map(({ label, href }) => {
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

        <HeaderActions />
      </Flex>
    </sigil.header>
  );
};

export default Header;

"use client";

import { Flex, HStack, Icon, Text, sigil } from "@omnidev/sigil";
import { usePathname } from "next/navigation";
import { LuMessageSquarePlus } from "react-icons/lu";

import { Link } from "components/core";
import { HeaderActions } from "components/layout";
import { token } from "generated/panda/tokens";
import { app } from "lib/config";
import { useAuth } from "lib/hooks";

/**
 * Layout header.
 */
const Header = () => {
  const pathname = usePathname(),
    { user, isLoading } = useAuth();

  return (
    <sigil.header
      display="flex"
      h={20}
      p={2}
      // TODO: discuss why this style prop is necessary
      style={{
        borderBottom: "1px solid",
        borderColor: token("colors.border.subtle"),
        backgroundColor: token("colors.background.default"),
      }}
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

          {!isLoading && !user?.customerId && (
            <Link href="/pricing" role="group">
              <Flex
                h={10}
                px={4}
                align="center"
                color={{
                  base: "foreground.muted",
                  _groupHover: "foreground.default",
                }}
                bgColor={
                  pathname === "/pricing" ? "background.muted" : "transparent"
                }
                borderRadius="md"
              >
                Pricing
              </Flex>
            </Link>
          )}
        </Flex>

        <HeaderActions />
      </Flex>
    </sigil.header>
  );
};

export default Header;

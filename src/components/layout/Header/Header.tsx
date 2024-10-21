"use client";

import { Flex, sigil, HStack, Text } from "@omnidev/sigil";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { app } from "lib/config";

/**
 * Layout header.
 */
const Header = () => {
  return (
    <sigil.header>
      <Flex
        h={16}
        // bgColor={bgColor}
        px={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack gap={8} alignItems="center">
          <Text fontWeight="bold" fontSize="lg">
            {app.name}
          </Text>
        </HStack>

        <Flex alignItems="center" gap={3}>
          <ThemeToggle />

          <ConnectButton showBalance={false} />
        </Flex>
      </Flex>
    </sigil.header>
  );
};

export default Header;

"use client";

import { Flex, HStack, Text, sigil } from "@omnidev/sigil";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { ThemeToggle } from "components/layout";
import { app } from "lib/config";

/**
 * Layout header.
 */
const Header = () => {
  return (
    <sigil.header
      display="flex"
      h={16}
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
    </sigil.header>
  );
};

export default Header;

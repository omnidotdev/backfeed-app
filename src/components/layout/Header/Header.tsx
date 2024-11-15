"use client";

import { Button, Flex, HStack, Icon, Text, sigil } from "@omnidev/sigil";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LuMessageSquarePlus } from "react-icons/lu";

import { ThemeToggle } from "components/layout";
import { token } from "generated/panda/tokens";
import { app } from "lib/config";

/**
 * Layout header.
 */
const Header = () => {
  return (
    <sigil.header
      display="flex"
      h={16}
      p={4}
      alignItems="center"
      justifyContent="space-between"
      // TODO: discuss why this style props is necessary
      style={{
        borderBottom: "1px solid",
        borderColor: token("colors.border.subtle"),
      }}
    >
      <HStack gap={2} alignItems="center">
        <Icon src={LuMessageSquarePlus} w={6} h={6} />
        <Text fontWeight="bold" fontSize="lg">
          {app.name}
        </Text>
      </HStack>

      <Flex alignItems="center" gap={6}>
        <ThemeToggle />

        <Button>Get Started</Button>
      </Flex>
    </sigil.header>
  );
};

export default Header;

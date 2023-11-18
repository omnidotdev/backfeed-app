"use client";

import {
  Flex,
  HStack,
  Button,
  Text,
  chakra,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  BsFillSunFill as SunIcon,
  BsFillMoonFill as MoonIcon,
} from "react-icons/bs";

import app from "lib/config/app.config";

/**
 * Layout header.
 */
const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bgColor = useColorModeValue("gray.100", "gray.900");

  return (
    <chakra.header>
      <Flex
        h={16}
        bgColor={bgColor}
        px={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack spacing={8} alignItems="center">
          <Text fontWeight="bold" fontSize="lg">
            {app.name}
          </Text>
        </HStack>

        <Flex alignItems="center" gap={3}>
          <Button variant="ghost" onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>

          <ConnectButton showBalance={false} />
        </Flex>
      </Flex>
    </chakra.header>
  );
};

export default Header;

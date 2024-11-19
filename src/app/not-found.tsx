"use client";

import { Button, Flex, Text } from "@omnidev/sigil";
import Link from "next/link";

/**
 * Global 404 (not found error) page.
 */
const GlobalNotFound = () => (
  <Flex direction="column" align="center" justify="center" gap={4} h="full">
    <Flex direction="column" align="center">
      <Text fontSize={80} color="foreground.disabled">
        404
      </Text>
      <Text>Page Not Found</Text>
    </Flex>

    <Link href="/">
      <Button>Return home</Button>
    </Link>
  </Flex>
);

export default GlobalNotFound;

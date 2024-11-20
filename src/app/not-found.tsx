"use client";

import { Button, Text, VStack } from "@omnidev/sigil";
import Link from "next/link";

/**
 * Global 404 (not found error) page.
 */
const GlobalNotFound = () => (
  <VStack justify="center" gap={4} h="full">
    <VStack>
      <Text fontSize={80} color="foreground.disabled">
        404
      </Text>

      <Text>Page Not Found</Text>
    </VStack>

    <Link href="/">
      <Button>Return home</Button>
    </Link>
  </VStack>
);

export default GlobalNotFound;

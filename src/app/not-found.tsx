"use client";

import { Button, Stack, Text } from "@omnidev/sigil";
import Link from "next/link";

/**
 * Global 404 (not found error) page.
 */
const GlobalNotFound = () => (
  <Stack align="center" justify="center" gap={4} h="full">
    <Stack align="center">
      <Text fontSize={80} color="foreground.disabled">
        404
      </Text>
      <Text>Page Not Found</Text>
    </Stack>

    <Link href="/">
      <Button>Return home</Button>
    </Link>
  </Stack>
);

export default GlobalNotFound;

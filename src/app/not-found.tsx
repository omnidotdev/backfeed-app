"use client";

import { Button, Text, VStack } from "@omnidev/sigil";
import { Link } from "components/core";
import { app } from "lib/config";

/**
 * Global 404 (not found error) page.
 */
const GlobalNotFound = () => (
  <VStack justify="center" gap={4} h="full">
    <VStack>
      <Text fontSize={80} color="foreground.disabled">
        {app.notFound.statusCode}
      </Text>

      <Text>{app.notFound.title}</Text>
    </VStack>

    <Link href="/">
      <Button>{app.notFound.returnHome}</Button>
    </Link>
  </VStack>
);

export default GlobalNotFound;

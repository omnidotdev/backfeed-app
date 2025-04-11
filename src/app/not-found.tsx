"use client";

import { Button, Text, Stack } from "@omnidev/sigil";

import { Link } from "components/core";
import { app } from "lib/config";

/**
 * Global 404 (not found error) page.
 */
const GlobalNotFound = () => (
  <Stack justify="center" gap={4} h="full">
    <Stack>
      <Text fontSize={80} color="foreground.disabled">
        {app.notFound.statusCode}
      </Text>

      <Text>{app.notFound.title}</Text>
    </Stack>

    <Link href="/">
      <Button>{app.notFound.returnHome}</Button>
    </Link>
  </Stack>
);

export default GlobalNotFound;

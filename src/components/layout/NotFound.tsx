import { Button, Text, VStack } from "@omnidev/sigil";
import { Link } from "@tanstack/react-router";

import app from "@/lib/config/app.config";

/**
 * Global 404 (not found error) component.
 */
const GlobalNotFound = () => (
  <VStack justify="center" gap={4} h="full">
    <VStack>
      <Text fontSize={80} color="foreground.disabled">
        {app.notFound.statusCode}
      </Text>

      <Text>{app.notFound.title}</Text>
    </VStack>

    <Link to="/">
      <Button>{app.notFound.returnHome}</Button>
    </Link>
  </VStack>
);

export default GlobalNotFound;

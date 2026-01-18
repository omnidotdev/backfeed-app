import { Button, Center, Icon, Text, VStack, css } from "@omnidev/sigil";
import { Link } from "@tanstack/react-router";
import { HiOutlineHome } from "react-icons/hi2";

import { Box } from "@/generated/panda/jsx";
import app from "@/lib/config/app.config";

/**
 * Global 404 (not found error) component.
 */
const GlobalNotFound = () => (
  <Center h="100dvh" w="full" p={8}>
    <VStack gap={8} textAlign="center">
      {/* Decorative 404 with glow effect */}
      <Box position="relative">
        <Text
          fontSize={{ base: "8xl", md: "9xl" }}
          fontWeight="bold"
          lineHeight={1}
          className={css({
            background: "gradients.ruby",
            backgroundClip: "text",
            color: "transparent",
          })}
        >
          {app.notFound.statusCode}
        </Text>

        {/* Glow effect behind the number */}
        <Box
          position="absolute"
          inset={0}
          zIndex={-1}
          filter="blur(40px)"
          opacity={0.4}
          className={css({
            background: "gradients.ruby",
          })}
        />
      </Box>

      {/* Message */}
      <VStack gap={2}>
        <Text fontSize="xl" fontWeight="semibold" color="foreground.default">
          {app.notFound.title}
        </Text>

        <Text color="foreground.muted" maxW="sm">
          The page you're looking for doesn't exist or has been moved.
        </Text>
      </VStack>

      {/* Return home button */}
      <Link to="/">
        <Button
          size="lg"
          className={css({
            gap: 2,
          })}
        >
          <Icon src={HiOutlineHome} w={5} h={5} />
          {app.notFound.returnHome}
        </Button>
      </Link>
    </VStack>
  </Center>
);

export default GlobalNotFound;

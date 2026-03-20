import { Button, Center, Icon, Text, VStack } from "@omnidev/sigil";
import { Link } from "@tanstack/react-router";
import { HiOutlineHome } from "react-icons/hi2";
import { LuArrowLeft } from "react-icons/lu";

import app from "@/lib/config/app.config";

import type { PropsWithChildren } from "react";

/**
 * 404 not found.
 */
const NotFound = ({ children }: PropsWithChildren) => (
  <Center h="100dvh" w="full" p={8}>
    <VStack gap={8} textAlign="center">
      <Text fontSize={{ base: "6xl", md: "7xl" }}>🔄</Text>

      <VStack gap={2}>
        <Text fontSize="xl" fontWeight="semibold" color="foreground.default">
          {children ?? app.notFound.title}
        </Text>

        <Text color="foreground.muted" maxW="sm">
          The page you're looking for doesn't exist or has been moved.
        </Text>
      </VStack>

      <VStack gap={2}>
        <Link to="/">
          <Button size="lg" gap={2}>
            <Icon src={HiOutlineHome} w={5} h={5} />
            {app.notFound.returnHome}
          </Button>
        </Link>

        <Button
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            window.history.back();
          }}
        >
          <Icon src={LuArrowLeft} h={4} w={4} />
          Go back
        </Button>
      </VStack>
    </VStack>
  </Center>
);

export default NotFound;

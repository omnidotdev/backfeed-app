import { Button, Icon, Text, VStack, sigil } from "@omnidev/sigil";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { LuArrowLeft } from "react-icons/lu";

import app from "@/lib/config/app.config";

import type { ErrorComponentProps } from "@tanstack/react-router";

/**
 * Default error boundary for caught route errors.
 */
const DefaultCatchBoundary = ({ error }: ErrorComponentProps) => {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <VStack justify="center" gap={4} h="full" py={16}>
      <Text fontSize={{ base: "6xl", md: "7xl" }}>🔄</Text>

      <VStack textAlign="center" gap={2}>
        <Text fontSize="2xl" fontWeight="bold" color="foreground.error">
          Something went wrong
        </Text>

        <Text maxW="lg" color="foreground.muted">
          An unexpected error occurred. Please try again or contact{" "}
          <sigil.a href={`mailto:${app.organization.supportEmailAddress}`}>
            <sigil.span color="brand.primary">
              {app.organization.supportEmailAddress}
            </sigil.span>
          </sigil.a>
          .
        </Text>
      </VStack>

      <VStack gap={2}>
        <Button onClick={() => router.invalidate()}>Try again</Button>

        <Button
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            window.history.back();
          }}
        >
          <Icon src={LuArrowLeft} h={4} w={4} />
          {app.globalError.goBack}
        </Button>
      </VStack>
    </VStack>
  );
};

export default DefaultCatchBoundary;

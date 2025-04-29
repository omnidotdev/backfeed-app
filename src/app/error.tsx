"use client";

import { Button, Icon, Text, VStack, sigil } from "@omnidev/sigil";
import { useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";

import { app } from "lib/config";

const GlobalErrorPage = () => {
  const router = useRouter();

  return (
    <VStack justify="center" gap={4} h="full">
      <VStack textAlign="center">
        <Text fontSize={80} color="foreground.disabled">
          {app.globalError.title}
        </Text>

        <Text maxW="lg">
          {app.globalError.description}{" "}
          <sigil.a href={`mailto:${app.organization.supportEmailAddress}`}>
            <sigil.span color="brand.primary">
              {app.organization.supportEmailAddress}
            </sigil.span>
          </sigil.a>
          .
        </Text>
      </VStack>

      <Button onClick={() => router.back()}>
        <Icon src={LuArrowLeft} h={4} w={4} />
        {app.globalError.goBack}
      </Button>
    </VStack>
  );
};

export default GlobalErrorPage;

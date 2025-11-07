"use client";

import { Button, Icon, sigil, Text, VStack } from "@omnidev/sigil";
import { app } from "lib/config";
import { useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";

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

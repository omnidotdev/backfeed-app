import { Flex } from "@omnidev/sigil";
import { createFileRoute, redirect } from "@tanstack/react-router";

import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";

export const Route = createFileRoute("/")({
  beforeLoad: async ({ context: { session } }) => {
    if (session?.user.rowId) throw redirect({ to: "/dashboard" });
  },
  component: LandingPage,
});

function LandingPage() {
  return (
    <Flex
      direction="column"
      align="center"
      w="100%"
      h="100%"
      bgColor="background.default"
    >
      <Hero />

      <Flex
        w="full"
        h="full"
        bgColor={{ base: "neutral.100", _dark: "black/80" }}
        align="center"
        justify="center"
      >
        <Features />
      </Flex>
    </Flex>
  );
}

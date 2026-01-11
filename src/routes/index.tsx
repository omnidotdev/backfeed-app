import { Flex } from "@omnidev/sigil";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

import Features from "@/components/landing/Features";
import Hero from "@/components/landing/Hero";

const searchSchema = z.object({
  returnTo: z.string().optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
  beforeLoad: async ({ context: { session }, search }) => {
    if (session?.user.rowId) {
      // If authenticated and has returnTo, go there; otherwise dashboard
      const destination = search.returnTo || "/dashboard";
      throw redirect({ to: destination });
    }
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

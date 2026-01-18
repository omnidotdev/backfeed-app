import { Flex } from "@omnidev/sigil";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

import { CTA, Features, Hero, SocialProof } from "@/components/landing";

const searchSchema = z.object({
  returnTo: z.string().optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
  beforeLoad: async ({ context: { session }, search }) => {
    if (session?.user?.rowId) {
      const destination = search.returnTo || "/dashboard";
      throw redirect({ to: destination });
    }
  },
  component: LandingPage,
});

function LandingPage() {
  return (
    <Flex direction="column" w="full" bgColor="background.default">
      <Hero />
      <Features />
      <SocialProof />
      <CTA />
    </Flex>
  );
}

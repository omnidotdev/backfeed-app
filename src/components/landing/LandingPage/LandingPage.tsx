"use client";

import { Flex } from "@omnidev/sigil";

import { Features, Hero } from "components/landing";

/**
 * Landing page. This provides the main layout for the home page when the user is not authenticated.
 */
const LandingPage = () => (
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

export default LandingPage;

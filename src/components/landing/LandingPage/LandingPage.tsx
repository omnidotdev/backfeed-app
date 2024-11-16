"use client";

import { Flex } from "@omnidev/sigil";

import { Features, Hero } from "components/landing";

/**
 * Landing page. This provides the main layout for the home page when the user is not authenticated.
 */
const LandingPage = () => {
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
        bgColor="background.muted"
        align="center"
        justify="center"
      >
        <Features />
      </Flex>
    </Flex>
  );
};

export default LandingPage;

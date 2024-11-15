"use client";

import { Flex } from "@omnidev/sigil";

import { Features, Hero } from "components/landing";

const HomePage = () => {
  return (
    <Flex direction="column" align="center" w="100%" h="100%">
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

export default HomePage;

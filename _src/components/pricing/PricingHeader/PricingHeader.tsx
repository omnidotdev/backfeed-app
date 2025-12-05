"use client";

import { Flex, Text } from "@omnidev/sigil";

import { app } from "../../../lib/config";

/**
 * Pricing header.
 */
const PricingHeader = () => (
  <Flex align="center" direction="column">
    <Text
      as="h1"
      fontSize={{ base: "4xl", lg: "5xl" }}
      fontWeight="bold"
      textAlign="center"
      mt={4}
    >
      {app.pricingPage.pricingHeader.title}
    </Text>

    <Text
      fontSize={{ base: "xl", lg: "2xl" }}
      maxW={{ md: "70%" }}
      textAlign="center"
      textWrap="pretty"
      m={4}
    >
      {app.pricingPage.pricingHeader.description}
    </Text>
  </Flex>
);

export default PricingHeader;

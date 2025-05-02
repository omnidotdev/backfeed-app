"use client";

import { Code, Flex, Icon, Text } from "@omnidev/sigil";
import { TbClipboard } from "react-icons/tb";
import { useCopyToClipboard } from "usehooks-ts";

import { app } from "lib/config";
import { toaster } from "lib/util";

/**
 * Pricing header.
 */
const PricingHeader = () => {
  const [, copy] = useCopyToClipboard();

  const handleCopyDiscountCode = async () => {
    try {
      await copy(app.pricingPage.pricingHeader.discountCode);

      toaster.success({ title: "Copied to clipboard!" });
    } catch (err) {
      toaster.error({ title: "Failed to copy" });
    }
  };

  return (
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

      <Code size="lg" mb={4} cursor="pointer" onClick={handleCopyDiscountCode}>
        {app.pricingPage.pricingHeader.discountCode}

        <Icon src={TbClipboard} h={4} w={4} ml={2} />
      </Code>
    </Flex>
  );
};

export default PricingHeader;

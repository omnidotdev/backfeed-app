import { Accordion, Stack, Text } from "@omnidev/sigil";
import { app } from "lib/config";

/**
 * Frequently asked questions about pricing.
 */
const PricingFAQ = () => (
    <Stack
      w="45%"
      m="auto"
      flexWrap="nowrap"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      mt={2}
    >
      <Text
        as="h2"
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center"
        mb={4}
        mt={8}
      >
        Frequently Asked Questions
      </Text>
      
      <Accordion items={app.pricingPage.pricingFAQ.items} />
    </Stack>
);

export default PricingFAQ;

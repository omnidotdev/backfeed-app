import { Accordion, Stack, Text } from "@omnidev/sigil";
import { app } from "lib/config";

/**
 * Frequently asked questions about pricing.
 */
const PricingFAQ = () => {
  return (
    <Stack
      width={"45%"}
      margin={"auto"}
      flexWrap={"nowrap"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Text
        as="h2"
        fontSize="2xl"
        fontWeight={"bold"}
        textAlign={"center"}
        marginBottom="4"
        marginTop="8"
      >
        Frequently Asked Questions
      </Text>
      <Accordion items={app.pricingPage.pricingFAQ.items} />
    </Stack>
  );
};

export default PricingFAQ;

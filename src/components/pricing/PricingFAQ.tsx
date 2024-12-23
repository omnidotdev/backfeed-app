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
        font={"2rem"}
        fontWeight={"bold"}
        textAlign={"center"}
        marginBottom={"2rem"}
        marginTop={"2rem"}
      >
        Frequently Asked Questions
      </Text>
      <Accordion items={app.pricingFAQ.items} />
    </Stack>
  );
};

export default PricingFAQ;

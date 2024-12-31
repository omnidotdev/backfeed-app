import { Flex, Text } from "@omnidev/sigil";
import { app } from "lib/config";

const PricingHeader = () => (
  <Flex align="center" direction="column" w="90%">
    <Text
      as="h1"
      fontSize="5xl"
      fontWeight="bold"
      textAlign="center"
      marginTop="4"
    >
      {app.pricingPage.pricingHeader.title}
    </Text>
    <Text fontSize="2xl" textAlign={"center"} marginBottom={"8"}>
      {app.pricingPage.pricingHeader.description}
    </Text>
  </Flex>
);

export default PricingHeader;

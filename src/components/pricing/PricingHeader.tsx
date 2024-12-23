import { Flex, Text } from "@omnidev/sigil";
import { app } from "lib/config";

function PricingHeader() {
  return (
    <Flex align="center" direction="column">
      <Text
        as="h1"
        fontSize={"3rem"}
        fontWeight={"bold"}
        textAlign={"center"}
        marginBottom={"0.5rem"}
        marginTop={"2rem"}
        // style={{
        //   fontSize: "3rem",
        //   fontWeight: "bold",
        //   textAlign: "center",
        //   marginBottom: "0.5rem",
        //   marginTop: "2rem",
        // }}
      >
        {app.pricingHeader.title}
      </Text>
      <Text fontSize={"1.5rem"} textAlign={"center"} marginBottom={"2rem"}>
        {app.pricingHeader.description}
      </Text>
    </Flex>
  );
}

export default PricingHeader;

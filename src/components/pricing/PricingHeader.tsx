import { Flex } from "@omnidev/sigil";
import { app } from "lib/config";

function PricingHeader() {

  return (
    <Flex align="center" direction="column">
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "0.5rem",
          marginTop: "2rem",
        }}
      >
        {app.pricingPage.pricingHeader.title}
      </h1>
      <p
        style={{
          fontSize: "1.5rem",
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        {app.pricingPage.pricingHeader.description}
      </p>
    </Flex>
  );
}

export default PricingHeader;

import { Flex } from "@omnidev/sigil";
import { app } from "lib/config";

function PricingHeader() {
  const { title, description } = app.pricingPage.pricingHeader;
  
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
        {title}
      </h1>
      <p
        style={{
          fontSize: "1.5rem",
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        {description}
      </p>
    </Flex>
  );
}

export default PricingHeader;

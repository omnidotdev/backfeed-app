import { Flex } from "@omnidev/sigil";

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
        Simple, transparent pricing
      </h1>
      <p
        style={{
          fontSize: "1.5rem",
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        Choose the perfect plan for your business. All plans include a 14-day
        free trial with no credit card required.
      </p>
    </Flex>
  );
}

export default PricingHeader;

import { Accordion } from "@omnidev/sigil";
import { app } from "lib/config";

/**
 * Frequently asked questions about pricing.
 */
const PricingFAQ = () => {
  
  return (
    <div
      style={{
        width: "45%",
        margin: "auto",
        flexWrap: "nowrap",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "2rem",
          marginTop: "2rem",
        }}
      >
        Frequently Asked Questions
      </h2>
      <Accordion items={app.pricingPage.pricingFAQ.items} />
    </div>
  );
}

export default PricingFAQ;

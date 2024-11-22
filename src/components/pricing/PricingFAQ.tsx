import { Accordion } from "@omnidev/sigil";
import { app } from "lib/config";

function PricingFAQ() {
  const faqItems = app.pricingPage.pricingFAQ.items;

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
      <Accordion items={faqItems} />
    </div>
  );
}

export default PricingFAQ;

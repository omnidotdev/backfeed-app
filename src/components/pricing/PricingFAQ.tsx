import { Accordion } from "@omnidev/sigil";

const items = [
  {
    title: "How does the 14-day trial work?",
    body: "You can try any plan free for 14 days with no credit card required. At the end of your trial, you can choose to subscribe or your account will automatically switch to the free plan.",
  },
  {
    title: "Can I switch plans later?",
    body: "Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll be prorated the difference. When you downgrade, you'll receive credit for your next billing cycle.",
  },
  {
    title: "What payment methods do you accept?",
    body: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. For Enterprise plans, we also support wire transfers and purchase orders.",
  },
  {
    title: "Do you offer discounts for non-profits or educational institutions?",
    body: "Yes, we offer special pricing for non-profits, educational institutions, and open-source projects. Please contact our sales team for more information.",
  },
  {
    title: "What happens to my data if I cancel?",
    body: "You'll have 30 days to export your data after cancellation. After that period, your data will be permanently deleted from our servers.",
  },
  {
    title: "Can I self-host this software?",
    body: "Yes! We offer open access to our API free of charge so you can build your own feedback provider around our infrastructure.",
  },
];

function PricingFAQ() {
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
      <Accordion
        items={items}
      />
    </div>
  );
}

export default PricingFAQ;

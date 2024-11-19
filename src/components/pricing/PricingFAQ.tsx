import { Accordion } from "@omnidev/sigil";
    
function PricingFAQ() {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <Accordion 
        items={[
          {
            title: "How does the 14-day trial work?",
            body:
              "You can try any plan free for 14 days with no credit card required. At the end of your trial, you can choose to subscribe or your account will automatically switch to the free plan.",
          },
          {
            title: "Can I switch plans later?",
            body:
              "Yes, you can upgrade or downgrade your plan at any time. When you upgrade, you'll be prorated the difference. When you downgrade, you'll receive credit for your next billing cycle.",
          },
          {
            title: "What payment methods do you accept?",
            body:
              "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. For Enterprise plans, we also support wire transfers and purchase orders.",
          },
          {
            title: "Do you offer discounts for non-profits or educational institutions?",
            body:
              "Yes, we offer special pricing for non-profits, educational institutions, and open-source projects. Please contact our sales team for more information.",
          },
          {
            title: "What happens to my data if I cancel?",
            body:
              "You'll have 30 days to export your data after cancellation. After that period, your data will be permanently deleted from our servers.",
          },
        ]}
        
      />
    </div>
  );
}

export default PricingFAQ;
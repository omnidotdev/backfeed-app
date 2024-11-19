import { Stack } from "@omnidev/sigil";
import { Card } from "@omnidev/sigil";

const tiers = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for small teams just getting started",
    features: [
      "Up to 1,000 responses per month",
      "Basic analytics dashboard",
      "Email support",
      "1 project",
      "Basic integrations",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$79",
    description: "Everything you need for a growing business",
    features: [
      "Up to 10,000 responses per month",
      "Advanced analytics & reporting",
      "Priority email & chat support",
      "Unlimited projects",
      "Advanced integrations",
      "Custom branding",
      "Team collaboration",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Advanced features for large organizations",
    features: [
      "Unlimited responses",
      "Custom analytics solutions",
      "24/7 phone & email support",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "Advanced security features",
      "On-premise deployment option",
    ],
    highlighted: false,
  },
];

function PricingCards() {
  return (
    <Stack gap={8}>
      {tiers.map((tier) => (
        <Card key={tier.name} title={tier.name} description={tier.description}>
          <Stack gap={4}>
            <Stack gap={1.5}>
              <p>Price</p>
              <div className="inline">
                <h3>{tier.price}</h3>
                <p>/month</p>
              </div>
            </Stack>
            <Stack gap={1.5}>
              <p>Features</p>
              <ul>
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </Stack>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}

export default PricingCards;

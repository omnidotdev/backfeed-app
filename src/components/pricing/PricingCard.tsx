import { useState } from "react";
import { Button, Card } from "@omnidev/sigil";

const tiers = [
  {
    title: "Self-Host",
    price: "$0",
    description: "For personal projects and small teams",
    features: [
      "Up to 100 responses per month",
      "Basic analytics dashboard",
      "Email support",
      "1 project",
      "Basic integrations",
    ],
    highlighted: false,
  },
  {
    title: "Basic",
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
    title: "Professional",
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
    title: "Enterprise",
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        {tiers.map((tier) => (
          <Card
            key={tier.title}
            title={tier.title}
            description={tier.description}
            style={{
              width: "15%",
              border: hoveredCard === tier.title ? "2px solid #2563EB" : "none", // Apply border on hover
              opacity: tier.title === "Self-Host" ? "0.6" : "1",
            }}
            onMouseEnter={() => setHoveredCard(tier.title)} // Set hover state
            onMouseLeave={() => setHoveredCard(null)} // Clear hover state
          >
            <div
              style={{
                display: "inline-flex",
              }}
            >
              <h3
                style={{
                  fontSize: "2.2rem",
                  fontWeight: "bold",
                }}
              >
                {tier.price}
              </h3>
              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "1.25rem",
                }}
              >
                /month
              </p>
            </div>
            <p
              style={{
                fontWeight: "bold",
                margin: "8px 0 8px 0",
              }}
            >
              Features
            </p>
            <ul
              style={{
                listStyle: "unset",
                marginLeft: "1rem",
              }}
            >
              {tier.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <Button marginTop="1rem">Get Started with {tier.title}</Button>
          </Card>
        ))}
      </div>
    </>
  );
}

export default PricingCards;

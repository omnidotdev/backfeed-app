import { Badge, Button, Card } from "@omnidev/sigil";
import { FaArrowRight } from "react-icons/fa6";

const tiers = [
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
    price: "Contact Us",
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
            borderColor={
              tier.title === "Professional" ? "brand.primary" : "none"
            }
            borderWidth={tier.title === "Professional" ? "2px" : "none"}
            key={tier.title}
            style={{
              width: "15%",
              opacity: tier.title === "Self-Host" ? "0.6" : "1",
              position: "relative",
              height: "auto",
            }}
          >
            {tier.highlighted === true && (
              <div
                style={{
                  position: "absolute",
                  top: "4px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "var(--colors-background-secondary)",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                <Badge
                  color="brand.primary"
                  style={{
                    height: "2rem",
                    borderRadius: "15px 15px",
                  }}
                >
                  Recommended
                </Badge>
              </div>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "450px",
              }}
            >
              <h3
                style={{
                  fontSize: "1.8rem",
                  textAlign: "center",
                }}
              >
                {tier.title}
              </h3>
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
                {tier.title !== "Enterprise" && (
                  <p
                    style={{
                      marginTop: "1rem",
                      fontSize: "1.25rem",
                    }}
                  >
                    /month
                  </p>
                )}
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
              <Button
                bgColor={
                  tier.title !== "Professional"
                    ? "brand.secondary"
                    : "brand.primary"
                }
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "90%",
                }}
              >
                Get Started <FaArrowRight />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default PricingCards;

import { Badge, Button, Card, HStack, Stack, Text } from "@omnidev/sigil";
import { app } from "lib/config";
import { FaArrowRight } from "react-icons/fa6";

function PricingCards() {
  const tiers = app.pricingPage.tiers;

  return (
    <>
      <HStack
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        gap={"16px"}
      >
        {app.pricingPage.tiers.map((tier) => (
          <Card
          key={tier.title}
          borderColor={
            tier.title === "Professional" ? "brand.primary" : "none"
          }
          borderWidth={tier.title === "Professional" ? "3px" : "2px"}
          flex={"1 1 calc(25% - 16px)"}
          maxWidth={"300px"}
          minWidth={"250px"}
          opacity={tier.title === "Self-Host" ? "0.6" : "1"}
          height={"600px"}
          display={"flex"}
          flexDirection={"column"}
          position={"relative"}
          >
            {tier.highlighted && (
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
                  height={"2rem"}
                  borderRadius={"15px 15px"}
                >
                  Recommended
                </Badge>
              </div>
            )}
            <Stack
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              height={"450px"}
            >
              <h3
                style={{
                  fontSize: "1.8rem",
                  textAlign: "center",
                }}
              >
                {tier.title}
              </h3>
              <HStack
              display={"inline-flex"}
              alignItems={"center"}
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
                <Text
                  fontSize={"1.25rem"}
                >
                  /month
                </Text>
              )}
            </HStack>

              <Text
                fontWeight={"bold"}
                margin={"8px 0 8px 0"}
              >
                Features
              </Text>
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
            </Stack>
          </Card>
        ))}
      </HStack>
      <style>
        {`
          @media (max-width: 768px) {
            .PricingCards div {
              flex: 1 1 calc(50% - 16px);
            }
          }

          @media (max-width: 480px) {
            .PricingCards div {
              flex: 1 1 100%;
            }
          }
        `}
      </style>
    </>
  );
}

export default PricingCards;

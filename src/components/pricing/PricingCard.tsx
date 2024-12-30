import {
  Badge,
  Button,
  Card,
  HStack,
  Stack,
  Text,
  sigil,
} from "@omnidev/sigil";
import { app } from "lib/config";
import { FaArrowRight } from "react-icons/fa6";

function PricingCards() {
  const tiers = app.pricingPage.pricingTiers.tiers;

  return (
    <>
      <HStack
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={"center"}
        gap={4}
      >
        {app.pricingPage.pricingTiers.tiers.map((tier) => (
          <Card
            key={tier.title}
            borderColor={
              tier.title === "Professional" ? "brand.primary" : "none"
            }
            borderWidth={tier.title === "Professional" ? "4" : "1"}
            flex={"1 1 calc(25%)"}
            gap={4}
            maxWidth="xs"
            minWidth="xs"
            opacity={tier.title === "Self-Host" ? "0.6" : "1"}
            h="xl"
            display={"flex"}
            flexDirection={"column"}
            position={"relative"}
          >
            {tier.title === "Professional" && (
              <Stack
                position="absolute"
                top="1"
                left="50%"
                transform="translateX(-50%)"
                backgroundColor="var(--colors-background-secondary)"
                padding="8px"
                borderRadius="1"
              >
                <Badge color="brand.primary" height={"8"} borderRadius={"4 4"}>
                  Recommended
                </Badge>
              </Stack>
            )}
            <Stack
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              height="md"
            >
              <Text as="h2" fontSize="3xl" textAlign="center">
                {tier.title}
              </Text>
              <HStack display={"inline-flex"} alignItems={"center"}>
                <Text as="h3" fontSize={"3xl"} fontWeight={"bold"}>
                  {tier.price}
                </Text>
                {tier.title !== "Enterprise" && (
                  <Text fontSize="xl" marginTop="1" marginLeft="-2.5">
                    /month
                  </Text>
                )}
              </HStack>

              <Text
                as="h4"
                fontSize={{ base: "2xl", lg: "4xl" }}
                fontWeight="bold"
                margin="8px 0 8px 0"
              >
                Features
              </Text>
              <sigil.ul
                style={{
                  listStyle: "unset",
                  marginLeft: 2,
                }}
              >
                {tier.features.map((feature) => (
                  <sigil.li key={feature}>{feature}</sigil.li>
                ))}
              </sigil.ul>
              <Button
                bgColor={
                  tier.title !== "Professional"
                    ? "brand.secondary"
                    : "brand.primary"
                }
                position={"absolute"}
                bottom={"16px"}
                left={"50%"}
                transform={"translateX(-50%)"}
                width={"90%"}
                fontSize="xl"
              >
                Get Started <FaArrowRight />
              </Button>
            </Stack>
          </Card>
        ))}
      </HStack>
    </>
  );
}

export default PricingCards;

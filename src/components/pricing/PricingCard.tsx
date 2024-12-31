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
  return (
    <>
      <HStack
        display="flex"
        flexWrap="wrap"
        flexDirection={{ base: "column", lg: "row" }}
        justifyContent="center"
        gap="4"
        w="100%"
      >
        {app.pricingPage.pricingTiers.tiers.map((tier) => (
          <Card
            key={tier.title}
            borderColor={
              tier.title === "Professional" ? "brand.primary" : "none"
            }
            borderWidth={tier.title === "Professional" ? "4" : "1"}
            gap="4"
            w={{ base: "100%", lg: "xs" }}
            opacity="1"
            h="xl"
            display="flex"
            position="relative"
          >
            {tier.title === "Professional" && (
              <Stack
                position="absolute"
                top="1"
                left="50%"
                transform="translateX(-50%)"
                backgroundColor="var(--colors-background-secondary)"
                p="2"
                borderRadius="1"
              >
                <Badge color="brand.primary" height="8" borderRadius="4 4">
                  Recommended
                </Badge>
              </Stack>
            )}
            
            <Stack
              display="flex"
              flexDirection="column"
              alignItems="center"
              height="md"
            >
              <Text as="h2" fontSize="3xl" textAlign="center">
                {tier.title}
              </Text>
              
              <HStack display="inline-flex" alignItems="center">
                <Text as="h3" fontSize="3xl" fontWeight="bold">
                  {tier.price}
                </Text>
                
                {tier.title !== "Enterprise" && (
                  <Text fontSize="xl" marginTop="1" marginLeft="-2.5">
                    /month
                  </Text>
                )}
              </HStack>

              <Text as="h4" fontSize="4xl" fontWeight="bold" m="2 0">
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
                position="absolute"
                bottom="4"
                left="50%"
                transform="translateX(-50%)"
                width="90%"
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

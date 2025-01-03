"use client";

import {
  Badge,
  Button,
  Card,
  Divider,
  HStack,
  Icon,
  Stack,
  Text,
  sigil,
} from "@omnidev/sigil";
import { app } from "lib/config";
import { FaArrowRight } from "react-icons/fa6";

import type { ButtonProps, CardProps } from "@omnidev/sigil";

interface Props extends CardProps {
  /** Pricing tier information. */
  tier: {
    /** Tier title. */
    title: string;
    /** Tier price. */
    price: string;
    /** Tier features. */
    features: string[];
  };
  /** Whether the tier is recommended. */
  isRecommendedTier?: boolean;
  /** Whether the tier uses a monthly pricing model. */
  isPerMonthPricing?: boolean;
  /** CTA button properties. */
  ctaProps?: ButtonProps;
}

/**
 * Pricing tier information.
 */
const PricingCard = ({
  tier,
  isRecommendedTier = false,
  isPerMonthPricing = true,
  ctaProps,
  ...rest
}: Props) => (
  <Card
    gap={4}
    w={{ base: "100%", sm: "sm", lg: "xs" }}
    h="xl"
    display="flex"
    position="relative"
    {...rest}
  >
    {isRecommendedTier && (
      <Stack
        position="absolute"
        top={1}
        left="50%"
        transform="translateX(-50%)"
        backgroundColor="background.secondary"
        p={2}
        borderRadius={1}
      >
        <Badge color="brand.primary" height={8} borderRadius={4}>
          {app.pricingPage.pricingTiers.recommended}
        </Badge>
      </Stack>
    )}

    <Stack display="flex" flexDirection="column" alignItems="center" h="md">
      <Text as="h2" fontSize="3xl" textAlign="center">
        {tier.title}
      </Text>

      <HStack display="inline-flex" alignItems="center">
        <Text as="h3" fontSize="3xl" fontWeight="bold">
          {tier.price}
        </Text>

        {perMonthPricing && (
          <Text fontSize="xl" mt={1} ml={-2.5}>
            {app.pricingPage.pricingCard.perMonth}
          </Text>
        )}
      </HStack>

      <Divider my={4} />

      <sigil.ul
        style={{
          listStyle: "disc",
          marginLeft: 2,
        }}
      >
        {tier.features.map((feature) => (
          <sigil.li key={feature}>{feature}</sigil.li>
        ))}
      </sigil.ul>

      <Button
        position="absolute"
        bottom={4}
        left="50%"
        transform="translateX(-50%)"
        w="90%"
        fontSize="xl"
        {...ctaProps}
      >
        {app.pricingPage.pricingCard.getStarted} <Icon src={FaArrowRight} />
      </Button>
    </Stack>
  </Card>
);

export default PricingCard;

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
  css,
  sigil,
} from "@omnidev/sigil";
import { app } from "lib/config";
import { FaArrowRight } from "react-icons/fa6";

import type { ButtonProps, CardProps } from "@omnidev/sigil";
import type { PricingType } from "components/pricing";

type Price = string | { monthly: number; annual: number };

const getPrice = (price: Price, isPerMonthPricing: boolean): string => {
  if (typeof price === "string") return price;
  return `$${isPerMonthPricing ? price.monthly : price.annual}`;
};

interface Props extends CardProps {
  /** Pricing tier information. */
  tier: {
    /** Tier title. */
    title: string;
    /** Tier description. */
    description: string;
    /** Tier price. */
    price: Price;
    /** Tier features. */
    features: string[];
  };
  /** Whether the tier is recommended. */
  isRecommendedTier?: boolean;
  /** Whether the tier is disabled. */
  isDisabled?: boolean;
  /** Pricing model (e.g. monthly or annual). */
  pricingModel?: PricingType;
  /** CTA button properties. */
  ctaProps?: ButtonProps;
}

/**
 * Pricing tier information.
 */
const PricingCard = ({
  tier,
  isRecommendedTier = false,
  isDisabled = false,
  pricingModel: pricingType,
  ctaProps,
  ...rest
}: Props) => {
  const isPerMonthPricing = pricingType === "monthly";
  const isPriceAString = typeof tier.price === "string";

  return (
    <Card
      gap={4}
      w={{ base: "100%", sm: "sm", lg: "xs" }}
      h="2xl"
      display="flex"
      position="relative"
      color={isDisabled ? "foreground.subtle" : undefined}
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

      <Stack
        display="flex"
        flexDirection="column"
        align="center"
        justify="space-between"
        h="100%"
      >
        <Stack align="center">
          <Text as="h2" fontSize="2xl" fontWeight="bold" textAlign="center">
            {tier.title}
          </Text>

          <Text textAlign="center" color="foreground.subtle">
            {tier.description}
          </Text>

          <HStack display="inline-flex" alignItems="center">
            <Text as="h3" fontSize="4xl" fontWeight="bold">
              {getPrice(tier.price, isPerMonthPricing)}
            </Text>

            {!isPriceAString && (
              <sigil.span
                fontSize="lg"
                mt={2}
                css={css.raw({ ml: -1.5 })}
                color="foreground.subtle"
              >
                /{app.pricingPage.pricingCard.user}/
                {isPerMonthPricing
                  ? app.pricingPage.pricingCard.month
                  : app.pricingPage.pricingCard.year}
              </sigil.span>
            )}
          </HStack>

          <Divider my={2} />

          <sigil.ul
            // TODO: fix styles not appropriately being applied, See: https://linear.app/omnidev/issue/OMNI-109/look-into-panda-css-styling-issues
            css={css.raw({
              listStyle: "disc",
              ml: 2,
            })}
          >
            {tier.features.map((feature) => (
              <sigil.li key={feature}>{feature}</sigil.li>
            ))}
          </sigil.ul>
        </Stack>

        <Button w="100%" fontSize="lg" disabled={isDisabled} {...ctaProps}>
          {app.pricingPage.pricingCard.getStarted}{" "}
          <Icon src={FaArrowRight} w={4} />
        </Button>
      </Stack>
    </Card>
  );
};

export default PricingCard;

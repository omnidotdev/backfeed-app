"use client";

import {
  Flex,
  HStack,
  Stack,
  Text,
  ToggleGroup,
  ToggleGroupItem,
} from "@omnidev/sigil";
import { signIn } from "next-auth/react";
import { useState } from "react";

import {
  PricingCard,
  PricingFAQ,
  PricingHeader,
  PricingMatrix,
} from "components/pricing";
import { app } from "lib/config";

export type PricingModel = "monthly" | "annual";

/**
 * Pricing overview section.
 */
const PricingOverview = () => {
  // TODO move to URL state (https://github.com/omnidotdev/backfeed-app/pull/69#discussion_r1986197545)
  const [pricingModel, setPricingModel] = useState<PricingModel>("monthly");

  return (
    <Stack px={0} align="center">
      <PricingHeader />

      {/* pricing model toggle */}
      <Flex position="relative">
        <ToggleGroup
          borderRadius="full"
          position="relative"
          mb={2}
          value={[pricingModel]}
          onValueChange={({ value }) =>
            // NB: length check prevents deselecting a selected value
            value.length && setPricingModel(value[0] as PricingModel)
          }
        >
          <ToggleGroupItem
            value="monthly"
            px={6}
            py={4}
            w="50%"
            _on={{
              bgColor: "brand.primary",
              color: "background.default",
            }}
          >
            {app.pricingPage.pricingHeader.monthly}
          </ToggleGroupItem>

          <ToggleGroupItem
            value="annual"
            px={6}
            py={4}
            w="50%"
            _on={{
              bgColor: "brand.primary",
              color: "background.default",
            }}
          >
            {app.pricingPage.pricingHeader.annual}
          </ToggleGroupItem>
        </ToggleGroup>

        <Text
          position="absolute"
          right={-2}
          top={-2}
          rotate="10deg"
          fontSize="xs"
          fontWeight="semibold"
          bgColor="brand.tertiary"
          color="background.default"
          px={2}
          borderRadius="sm"
          boxShadow="sm"
        >
          {app.pricingPage.pricingHeader.savings}
        </Text>
      </Flex>

      <HStack flexWrap="wrap" justify="center" gap={4} px={4}>
        {app.pricingPage.pricingTiers.tiers.map((tier) => {
          const isTeamTier = tier.title.includes("Team");
          const isEnterpriseTier = tier.title.includes("Enterprise");

          return (
            <PricingCard
              key={tier.title}
              tier={tier}
              isRecommendedTier={isTeamTier}
              isDisabled={isEnterpriseTier}
              pricingModel={pricingModel}
              borderWidth={isTeamTier ? 2 : 1}
              borderColor={isTeamTier ? "brand.primary" : "none"}
              ctaProps={{
                // TODO: update. Remove callbackUrl so it routes back to pricing after redirect on pricing page is removed and "Get Started" functionality is implemented
                onClick: () => signIn("omni", { callbackUrl: "/" }),
              }}
            />
          );
        })}
      </HStack>

      <PricingMatrix maxW="5xl" alignSelf="center" my={6} />

      <PricingFAQ w="100%" maxW="5xl" alignSelf="center" mb={6} px={4} />
    </Stack>
  );
};

export default PricingOverview;

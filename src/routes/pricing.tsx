import { ToggleGroupRootProvider, useToggleGroup } from "@ark-ui/react";
import { Flex, Stack, Text, ToggleGroupItem } from "@omnidev/sigil";
import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

import PricingCard from "@/components/pricing/PricingCard";
import PricingFAQ from "@/components/pricing/PricingFAQ";
import PricingHeader from "@/components/pricing/PricingHeader";
import PricingMatrix from "@/components/pricing/PricingMatrix";
import app from "@/lib/config/app.config";
import { getPrices } from "@/server/functions/prices";

export const Route = createFileRoute("/pricing")({
  loader: async () => {
    const prices = await getPrices();

    return { prices };
  },
  component: PricingPage,
});

function PricingPage() {
  const { prices } = Route.useLoaderData();

  const pricingModel = useToggleGroup({
    defaultValue: ["month"],
    deselectable: false,
  });

  const filteredPrices = useMemo(
    () =>
      prices.filter(
        (price) => price.recurring?.interval === pricingModel.value[0],
      ),
    [prices, pricingModel.value],
  );

  return (
    <Stack px={0} align="center">
      <PricingHeader />

      {/* pricing model toggle */}
      <Flex position="relative" mb={4}>
        <ToggleGroupRootProvider value={pricingModel}>
          <Flex
            borderRadius="full"
            borderWidth="1px"
            borderColor="border.default"
            position="relative"
            mb={2}
            overflow="hidden"
          >
            <ToggleGroupItem
              value="month"
              color="foreground.default"
              px={6}
              py={2}
              flex={1}
              transition="none"
              _on={{
                bgColor: "brand.primary",
                color: "background.default",
              }}
            >
              {app.pricingPage.pricingHeader.monthly}
            </ToggleGroupItem>

            <ToggleGroupItem
              value="year"
              color="foreground.default"
              px={6}
              py={2}
              flex={1}
              transition="none"
              _on={{
                bgColor: "brand.primary",
                color: "background.default",
              }}
            >
              {app.pricingPage.pricingHeader.annual}
            </ToggleGroupItem>
          </Flex>
        </ToggleGroupRootProvider>

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

      <Flex
        w="full"
        direction={{ base: "column", xl: "row" }}
        align="center"
        justify="center"
        gap={4}
        px={4}
      >
        <PricingCard price={undefined} />

        {filteredPrices.map((price) => (
          <PricingCard key={price.id} price={price} />
        ))}
      </Flex>

      <PricingMatrix maxW="5xl" alignSelf="center" my={6} />

      <PricingFAQ w="100%" maxW="5xl" alignSelf="center" mb={6} px={4} />
    </Stack>
  );
}

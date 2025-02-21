"use client";

import { Flex, Icon, Stack, Text } from "@omnidev/sigil";

import type { IconType } from "react-icons";

interface Props {
  title: string;
  description: string;
  featureIcon: IconType;
}

// TODO: use `Card` component once `CardHeader` is conditionally rendered

/**
 * Landing page feature card.
 */
const FeatureCard = ({ title, description, featureIcon }: Props) => (
  <Flex
    aspectRatio={1}
    maxH="xs"
    bgColor="background.default"
    borderRadius="md"
    boxShadow="lg"
    p={{ base: 4, sm: 6 }}
  >
    <Stack align="center" h="full" textAlign="center" gap={{ base: 2, sm: 6 }}>
      <Icon
        src={featureIcon}
        w={{ base: 6, sm: 10 }}
        h={{ base: 6, sm: 10 }}
        color="brand.primary"
      />

      <Stack>
        <Text fontSize={{ sm: "lg" }} fontWeight="bold" mt={2}>
          {title}
        </Text>

        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color="foreground.subtle"
          fontWeight="medium"
          textWrap="pretty"
          mb={4}
        >
          {description}
        </Text>
      </Stack>
    </Stack>
  </Flex>
);
export default FeatureCard;

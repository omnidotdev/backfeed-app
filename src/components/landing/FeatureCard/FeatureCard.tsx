"use client";

import { Flex, Icon, Text } from "@omnidev/sigil";

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
    direction="column"
    align="center"
    textAlign="center"
    justify="center"
    bgColor="background.default"
    borderRadius="md"
    boxShadow="lg"
    p={{ base: 4, sm: 6 }}
    gap={4}
  >
    <Icon src={featureIcon} w={10} h={10} color="brand.primary" />

    <Text fontSize="lg" fontWeight="bold" mt={2}>
      {title}
    </Text>

    <Text
      color="foreground.subtle"
      fontWeight="medium"
      textWrap="balance"
      px={2}
    >
      {description}
    </Text>
  </Flex>
);
export default FeatureCard;

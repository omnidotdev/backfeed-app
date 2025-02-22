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
    position="relative"
    aspectRatio={1}
    maxH={{ base: 64, sm: "xs" }}
    direction="column"
    align="center"
    textAlign="center"
    justify="center"
    bgColor={{ base: "neutral.50", _dark: "neutral.950" }}
    borderRadius="md"
    boxShadow="lg"
    p={{ base: 4, sm: 6 }}
    gap={4}
  >
    <Icon
      src={featureIcon}
      w="70%"
      h="70%"
      color="brand.primary"
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      opacity={0.05}
    />

    <Text
      fontSize={{ base: "lg", sm: "2xl" }}
      fontWeight="bold"
      mt={2}
      zIndex="foreground"
    >
      {title}
    </Text>

    <Text
      fontSize={{ sm: "xl" }}
      color="foreground.muted"
      fontWeight="medium"
      textWrap="balance"
      px={2}
      zIndex="foreground"
    >
      {description}
    </Text>
  </Flex>
);
export default FeatureCard;

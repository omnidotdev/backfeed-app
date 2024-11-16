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
const FeatureCard = ({ title, description, featureIcon }: Props) => {
  return (
    <Flex
      aspectRatio={1}
      maxH="xs"
      bgColor="background.default"
      borderRadius="md"
      boxShadow="lg"
      p={6}
    >
      <Stack align="flex-start" h="full">
        <Icon src={featureIcon} w={10} h={10} color="brand.primary" mb={2} />
        <Text fontSize="lg" fontWeight="bold" my={2}>
          {title}
        </Text>
        <Text
          fontSize={{ base: "md", xlTo2xl: "sm" }}
          color="foreground.subtle"
          fontWeight="medium"
          mb={4}
        >
          {description}
        </Text>
      </Stack>
    </Flex>
  );
};

export default FeatureCard;

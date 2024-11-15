import { Card, Icon, Stack, Text, useBreakpointValue } from "@omnidev/sigil";

import type { IconType } from "react-icons";

interface Props {
  title: string;
  description: string;
  featureIcon: IconType;
}

const FeatureCard = ({ title, description, featureIcon }: Props) => {
  const iconSize = useBreakpointValue({ base: 6, md: 8, xl: 10 });

  return (
    <Card aspectRatio={1} maxH="xs" headerProps={{ p: 0 }}>
      <Stack align="flex-start" h="full" pt={6}>
        <Icon
          src={featureIcon}
          w={iconSize}
          h={iconSize}
          color="brand.primary"
        />
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
    </Card>
  );
};

export default FeatureCard;

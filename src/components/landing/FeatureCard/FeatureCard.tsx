import { Card, Icon, Stack, Text } from "@omnidev/sigil";

import type { IconType } from "react-icons";

interface Props {
  title: string;
  description: string;
  featureIcon: IconType;
}

const FeatureCard = ({ title, description, featureIcon }: Props) => {
  return (
    <Card aspectRatio={1} maxH="xs" headerProps={{ p: 4 }}>
      <Stack align="flex-start" h="full">
        <Icon src={featureIcon} w={10} h={10} color="foreground.muted" />
        <Text fontSize="xl" fontWeight="bold" mb={2} mt={4}>
          {title}
        </Text>
        <Text color="foreground.subtle" fontWeight="medium" mb={4}>
          {description}
        </Text>
      </Stack>
    </Card>
  );
};

export default FeatureCard;

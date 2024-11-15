import { Flex, Grid, Text } from "@omnidev/sigil";

import { FeatureCard } from "components/landing";
import { app } from "lib/config";

const Features = () => {
  return (
    <Flex
      direction="column"
      h="100%"
      p={20}
      align="center"
      justify="space-around"
    >
      <Flex direction="column" align="center" textAlign="center">
        <Text fontSize="3xl" fontWeight="bold" mb={3}>
          {app.landingPage.features.title}
        </Text>
        <Text
          fontSize="lg"
          mb={4}
          color="foreground.muted"
          fontWeight="medium"
          maxW="2xl"
          textAlign="center"
        >
          {app.landingPage.features.description}
        </Text>
      </Flex>

      <Grid gap={8} columns={{ base: 1, lg: 2, xl: 4 }}>
        {app.landingPage.features.pinned.map(({ title, description, Icon }) => (
          <FeatureCard
            key={title}
            title={title}
            description={description}
            featureIcon={Icon}
          />
        ))}
      </Grid>
    </Flex>
  );
};

export default Features;

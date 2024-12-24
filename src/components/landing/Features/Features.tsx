"use client";

import { Flex, Grid, Text } from "@omnidev/sigil";
import {
  IoBarChartOutline,
  IoChatboxOutline,
  IoPulseOutline,
  IoRocketOutline,
} from "react-icons/io5";

import { FeatureCard } from "components/landing";
import { app } from "lib/config";

const FEATURES = [
  {
    title: app.landingPage.features.pinned.collection.title,
    description: app.landingPage.features.pinned.collection.description,
    Icon: IoChatboxOutline,
  },
  {
    title: app.landingPage.features.pinned.analytics.title,
    description: app.landingPage.features.pinned.analytics.description,
    Icon: IoBarChartOutline,
  },
  {
    title: app.landingPage.features.pinned.implementation.title,
    description: app.landingPage.features.pinned.implementation.description,
    Icon: IoRocketOutline,
  },
  {
    title: app.landingPage.features.pinned.workflows.title,
    description: app.landingPage.features.pinned.workflows.description,
    Icon: IoPulseOutline,
  },
];

/**
 * Landing page features section.
 */
const Features = () => (
  <Flex
    direction="column"
    h="100%"
    py={20}
    px={12}
    align="center"
    justify="space-around"
    gap={8}
  >
    <Flex direction="column" align="center" textAlign="center">
      <Text fontSize={{ base: "2xl", xl: "3xl" }} fontWeight="bold" mb={3}>
        {app.landingPage.features.title}
      </Text>

      <Text
        fontSize={{ base: "md", xl: "lg" }}
        mb={4}
        color="foreground.subtle"
        fontWeight="medium"
        maxW="2xl"
        textAlign="center"
      >
        {app.landingPage.features.description}
      </Text>
    </Flex>

    <Grid gap={8} columns={{ base: 1, md: 2, xl: 4 }}>
      {FEATURES.map(({ title, description, Icon }) => (
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

export default Features;

import { Flex, Grid, Icon, Text } from "@omnidev/sigil";
import {
  IoBarChartOutline,
  IoChatboxOutline,
  IoPulseOutline,
  IoRocketOutline,
} from "react-icons/io5";

import app from "@/lib/config/app.config";

const FEATURES = [
  {
    title: app.landingPage.features.pinned.collection.title,
    description: app.landingPage.features.pinned.collection.description,
    icon: IoChatboxOutline,
  },
  {
    title: app.landingPage.features.pinned.analytics.title,
    description: app.landingPage.features.pinned.analytics.description,
    icon: IoBarChartOutline,
  },
  {
    title: app.landingPage.features.pinned.implementation.title,
    description: app.landingPage.features.pinned.implementation.description,
    icon: IoRocketOutline,
  },
  {
    title: app.landingPage.features.pinned.workflows.title,
    description: app.landingPage.features.pinned.workflows.description,
    icon: IoPulseOutline,
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
      <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" mb={3}>
        {app.landingPage.features.title}
      </Text>

      <Text
        fontSize={{ base: "md", md: "lg" }}
        mb={4}
        color="foreground.subtle"
        fontWeight="medium"
        maxW="2xl"
        textAlign="center"
      >
        {app.landingPage.features.description}
      </Text>
    </Flex>

    <Grid gap={8} columns={{ base: 1, md: 2, "2xl": 4 }}>
      {FEATURES.map(({ title, description, icon }) => (
        <Flex
          key={title}
          position="relative"
          aspectRatio={1}
          maxH={{ base: 64, sm: "xs" }}
          direction="column"
          align="center"
          textAlign="center"
          justify="center"
          bgColor={{ base: "neutral.50", _dark: "neutral.950" }}
          borderRadius="md"
          boxShadow="card"
          p={{ base: 4, sm: 6 }}
          gap={4}
        >
          <Icon
            src={icon}
            w="70%"
            h="70%"
            color="brand.primary"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            opacity={0.1}
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
      ))}
    </Grid>
  </Flex>
);

export default Features;

"use client";

import { Button, Flex, Icon, Text, useBreakpoint } from "@omnidev/sigil";
import { FiArrowRight } from "react-icons/fi";

import { app } from "lib/config";
import { useIsTablet } from "lib/hooks";

import type { ButtonProps } from "@omnidev/sigil";

const Hero = () => {
  const isTablet = useIsTablet();

  const actions = [
    {
      label: isTablet ? "Start Collecting Feedback" : "Start",
      icon: FiArrowRight,
    },
    {
      label: isTablet ? "Watch Demo" : "Demo",
      variant: "outline" as ButtonProps["variant"],
    },
  ];

  return (
    <Flex direction="column" align="center" gap={4} py={20} px={6} maxW="4xl">
      <Text
        as="h1"
        fontSize={{ base: "4xl", xl: "6xl" }}
        fontWeight="bold"
        textAlign="center"
        lineHeight={1}
        textWrap="pretty"
      >
        {app.landingPage.hero.title}
      </Text>
      <Text
        as="h2"
        color="foreground.subtle"
        fontSize={{ base: "md", xl: "xl" }}
        fontWeight="medium"
        textAlign="center"
        lineHeight={1.5}
        textWrap="pretty"
      >
        {app.landingPage.hero.description}
      </Text>
      <Flex mt={6} gap={4}>
        {actions.map(
          ({
            label,
            icon: ActionIcon,
            variant = "solid" as ButtonProps["variant"],
          }) => (
            <Button key={label} variant={variant} size="lg">
              {label}
              {ActionIcon && <Icon src={ActionIcon} h={4} w={4} />}
            </Button>
          )
        )}
      </Flex>
    </Flex>
  );
};

export default Hero;

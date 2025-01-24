"use client";

import { Button, Flex, Icon, Text } from "@omnidev/sigil";
import { FiArrowRight } from "react-icons/fi";

import { app } from "lib/config";

import type { ButtonProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface ActionProps extends ButtonProps {
  label: {
    short: string;
    long: string;
  };
  icon?: IconType;
}

/**
 * Landing page hero section.
 */
const Hero = () => {
  const actions: ActionProps[] = [
    {
      label: {
        short: app.landingPage.hero.cta.collect.label.short,
        long: app.landingPage.hero.cta.collect.label.long,
      },
      icon: FiArrowRight,
    },
    {
      label: {
        short: app.landingPage.hero.cta.demo.label.short,
        long: app.landingPage.hero.cta.demo.label.long,
      },
      variant: "outline",
    },
  ];

  return (
    <Flex direction="column" align="center" gap={4} py={20} px={8} maxW="4xl">
      <Text
        as="h1"
        fontSize={{ base: "4xl", md: "6xl" }}
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
        fontSize={{ base: "md", md: "xl" }}
        fontWeight="medium"
        textAlign="center"
        lineHeight={1.5}
        textWrap="pretty"
      >
        {app.landingPage.hero.description}
      </Text>

      <Flex mt={6} gap={4}>
        {actions.map(({ label, icon: ActionIcon, ...rest }) => (
          <Button key={label.long} size="lg" {...rest}>
            <Text display={{ base: "inline", md: "none" }}>{label.short}</Text>
            <Text display={{ base: "none", md: "inline" }}>{label.long}</Text>
            {ActionIcon && <Icon src={ActionIcon} h={4} w={4} />}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};

export default Hero;

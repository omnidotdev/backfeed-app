"use client";

import { Button, Flex, Icon, Text, VStack } from "@omnidev/sigil";
import { app } from "lib/config";
import { signIn } from "next-auth/react";
import { BsMegaphone } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";

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
      onClick: () => signIn("omni"),
    },
    {
      label: {
        short: app.landingPage.hero.cta.docs.label.short,
        long: app.landingPage.hero.cta.docs.label.long,
      },
      variant: "outline",
      onClick: () => window.open(app.docsUrl, "_blank", "noopener,noreferrer"),
    },
  ];

  return (
    <VStack gap={0} py={{ base: 4, md: 12 }} px={8} maxW="4xl">
      <Icon
        src={BsMegaphone}
        h={{ base: 16, md: 24 }}
        w={{ base: 16, md: 24 }}
        my={4}
        rotate="-12deg"
        color={{ base: "brand.primary.600", _dark: "brand.primary.800" }}
      />

      <Text
        my={4}
        as="h1"
        fontSize={{ base: "3xl", md: "6xl" }}
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
    </VStack>
  );
};

export default Hero;

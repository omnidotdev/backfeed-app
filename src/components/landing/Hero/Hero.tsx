"use client";

import { Button, Flex, Icon, Text } from "@omnidev/sigil";
import { signIn } from "next-auth/react";
import { FiArrowRight } from "react-icons/fi";

import { Image } from "components/core";
import { app } from "lib/config";

import type { ButtonProps } from "@omnidev/sigil";
import { useViewportSize } from "lib/hooks";
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
  const isMediumViewport = useViewportSize({ minWidth: "48em" });

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
    <Flex
      direction="column"
      align="center"
      py={{ base: 4, md: 12 }}
      px={8}
      maxW="4xl"
    >
      <Image
        src="/img/hero.png"
        alt={app.landingPage.hero.imageAlt}
        priority
        width={isMediumViewport ? 224 : 150}
        height={isMediumViewport ? 323 : 216}
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
    </Flex>
  );
};

export default Hero;

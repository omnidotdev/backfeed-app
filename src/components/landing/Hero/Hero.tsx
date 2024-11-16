"use client";

import { Button, Flex, Icon, Text, useIsClient } from "@omnidev/sigil";
import { FiArrowRight } from "react-icons/fi";

import { app } from "lib/config";
import { useIsTablet } from "lib/hooks";

import type { ButtonProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface ActionProps extends ButtonProps {
  label: string;
  icon?: IconType;
}

/**
 * Landing page hero section.
 */
const Hero = () => {
  const isMounted = useIsClient(),
    isTablet = useIsTablet();

  const actions: ActionProps[] = [
    {
      label: isTablet ? "Start Collecting Feedback" : "Start",
      icon: FiArrowRight,
    },
    {
      label: isTablet ? "Watch Demo" : "Demo",
      variant: "outline",
    },
  ];

  return (
    <Flex direction="column" align="center" gap={4} py={20} px={8} maxW="4xl">
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
        {actions.map(({ label, icon: ActionIcon, ...rest }) => (
          <Button
            key={label}
            size="lg"
            visibility={isMounted ? "visible" : "hidden"}
            {...rest}
          >
            {label}
            {ActionIcon && <Icon src={ActionIcon} h={4} w={4} />}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
};

export default Hero;

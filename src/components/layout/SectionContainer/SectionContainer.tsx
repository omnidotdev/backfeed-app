"use client";

import { Flex, Icon, Stack, Text } from "@omnidev/sigil";

import type { FlexProps } from "@omnidev/sigil";
import type { IconType } from "react-icons";

interface Props extends FlexProps {
  /** Container title */
  title: string;
  /** Container description */
  description?: string;
  /** Visual icon */
  icon?: IconType;
}

/**
 * Section container.
 */
const SectionContainer = ({
  title,
  description,
  children,
  icon,
  ...rest
}: Props) => (
  <Stack
    position="relative"
    bgColor="background.default"
    borderRadius="lg"
    boxShadow="lg"
    p={{ base: 4, sm: 6 }}
    gap={6}
    {...rest}
  >
    <Stack>
      <Flex align="center" gap={2}>
        {icon && <Icon src={icon} w={5} h={5} color="foreground.subtle" />}

        <Text
          fontSize={{ base: "xl", lg: "2xl" }}
          fontWeight="semibold"
          lineHeight={1.2}
        >
          {title}
        </Text>
      </Flex>

      <Text color="foreground.subtle" fontSize={{ base: "xs", lg: "sm" }}>
        {description}
      </Text>
    </Stack>

    {children}
  </Stack>
);

export default SectionContainer;

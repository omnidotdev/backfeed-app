"use client";

import { Flex, Text } from "@omnidev/sigil";

import type { FlexProps } from "@omnidev/sigil";

interface Props extends FlexProps {
  /** Section title. */
  title: string;
  /** Props to pass to the main content container. */
  contentProps?: FlexProps;
}

/**
 * Feedback section.
 */
const FeedbackSection = ({ title, children, contentProps, ...rest }: Props) => (
  <Flex
    position="relative"
    direction="column"
    flex={1}
    h="100%"
    bgColor="background.default"
    borderRadius="lg"
    boxShadow="card"
    overflow="auto"
    {...rest}
  >
    <Text
      position="absolute"
      top={0}
      w="full"
      backgroundColor="background.subtle"
      fontSize="2xl"
      fontWeight="semibold"
      boxShadow="xs"
      lineHeight={0.7}
      p={6}
    >
      {title}
    </Text>

    <Flex direction="column" flex={1} mt={16} {...contentProps}>
      {children}
    </Flex>
  </Flex>
);

export default FeedbackSection;

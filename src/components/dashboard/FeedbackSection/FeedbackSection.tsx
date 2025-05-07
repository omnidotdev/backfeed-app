"use client";

import { Stack, Text } from "@omnidev/sigil";

import type { FlexProps, StackProps } from "@omnidev/sigil";

interface Props extends FlexProps {
  /** Section title. */
  title: string;
  /** Props to pass to the main content container. */
  contentProps?: StackProps;
}

/**
 * Feedback section.
 */
const FeedbackSection = ({ title, children, contentProps, ...rest }: Props) => (
  <Stack
    position="relative"
    bgColor="background.default"
    borderRadius="lg"
    boxShadow="card"
    {...rest}
  >
    <Text
      position="absolute"
      top={0}
      w="full"
      backgroundColor="background.subtle"
      borderTopRadius="lg"
      fontSize="2xl"
      fontWeight="semibold"
      boxShadow="xs"
      lineHeight={0.7}
      p={6}
    >
      {title}
    </Text>

    <Stack flex={1} mt={16} {...contentProps}>
      {children}
    </Stack>
  </Stack>
);

export default FeedbackSection;

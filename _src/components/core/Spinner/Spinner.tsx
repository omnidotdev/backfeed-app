"use client";

import { Box, Text } from "@omnidev/sigil";

import type { BoxProps } from "@omnidev/sigil";

interface Props extends BoxProps {
  /**
   * For accessibility, it is important to add a fallback loading text.
   * This text will be visible to screen readers.
   * @default "Loading..."
   */
  label?: string;
}

/**
 * Spinner component. Used to indicate loading state.
 */
const Spinner = ({ label = "Loading...", ...rest }: Props) => (
  <Box
    borderWidth={2}
    borderStyle="solid"
    borderRadius="full"
    borderColor="foreground.subtle"
    borderBottomColor="transparent"
    w={6}
    h={6}
    animation="spin"
    animationDuration="slowest"
    {...rest}
  >
    <Text as="span" srOnly>
      {label}
    </Text>
  </Box>
);

export default Spinner;

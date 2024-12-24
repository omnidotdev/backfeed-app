"use client";

import { Text } from "@omnidev/sigil";

import type { TextProps } from "@omnidev/sigil";

/**
 * Overflow text component. Used to truncate text that is too long.
 */
const OverflowText = ({ children, ...rest }: TextProps) => (
  <Text overflow="hidden" textOverflow="ellipsis" {...rest}>
    {children}
  </Text>
);

export default OverflowText;

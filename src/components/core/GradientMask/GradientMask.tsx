import { Box } from "@omnidev/sigil";

import type { BoxProps } from "@omnidev/sigil";

/**
 * Gradient mask component. Used to provide a fade-out effect for scrollable containers.
 */
const GradientMask = (props: BoxProps) => (
  <Box
    position="absolute"
    h={24}
    w="full"
    bgGradient="mask"
    pointerEvents="none"
    {...props}
  />
);

export default GradientMask;

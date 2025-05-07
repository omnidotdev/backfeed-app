import { Box } from "@omnidev/sigil";

import type { BoxProps } from "@omnidev/sigil";

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

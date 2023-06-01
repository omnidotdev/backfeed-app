import { CacheProvider as SSRCacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

import baseTheme from "lib/theme/baseTheme";

import type { ChakraProviderProps } from "@chakra-ui/react";

/**
 * UI toolkit provider.
 */
const UIProvider = ({ children, ...rest }: ChakraProviderProps) => (
  <SSRCacheProvider>
    <ChakraProvider theme={baseTheme} {...rest}>
      {children}
    </ChakraProvider>
  </SSRCacheProvider>
);

export default UIProvider;

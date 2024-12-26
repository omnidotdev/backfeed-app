import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";

import { wagmiConfig } from "lib/config";
import rainbowKitTheme from "lib/theme/rainbowKitTheme";

import type { PropsWithChildren } from "react";

import "@rainbow-me/rainbowkit/styles.css";

/**
 * Blockchain provider.
 */
const BlockchainProvider = ({ children }: PropsWithChildren) => (
  <WagmiProvider config={wagmiConfig}>
    <RainbowKitProvider modalSize="compact" theme={rainbowKitTheme}>
      {children}
    </RainbowKitProvider>
  </WagmiProvider>
);

export default BlockchainProvider;

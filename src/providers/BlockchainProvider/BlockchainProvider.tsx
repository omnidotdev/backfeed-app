import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig as WagmiProvider } from "wagmi";

import wagmiConfig, { chains } from "lib/config/wagmi.config";
import rainbowKitTheme from "lib/theme/rainbowKitTheme";

import type { ReactNode } from "react";

import "@rainbow-me/rainbowkit/styles.css";

/**
 * Blockchain provider.
 */
const BlockchainProvider = ({ children }: { children: ReactNode }) => (
  <WagmiProvider config={wagmiConfig}>
    <RainbowKitProvider
      chains={chains}
      modalSize="compact"
      theme={rainbowKitTheme}
    >
      {children}
    </RainbowKitProvider>
  </WagmiProvider>
);

export default BlockchainProvider;

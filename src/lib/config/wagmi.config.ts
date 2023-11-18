import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, mainnet } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import {
  ALCHEMY_API_KEY,
  WALLETCONNECT_PROJECT_ID,
} from "lib/config/env.config";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [alchemyProvider({ apiKey: ALCHEMY_API_KEY! }), publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: "Providers",
    wallets: [
      metaMaskWallet({ chains }),
      walletConnectWallet({ chains, projectId: WALLETCONNECT_PROJECT_ID }),
      injectedWallet({ chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { chains };
export default wagmiConfig;

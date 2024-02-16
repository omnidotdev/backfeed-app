"use client";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "viem";
import { mainnet } from "viem/chains";

import app from "./app.config";
import { WALLETCONNECT_PROJECT_ID } from "./env.config";

/**
 * wagmi config.
 */
const wagmiConfig = getDefaultConfig({
  appName: app.name,
  projectId: WALLETCONNECT_PROJECT_ID!,
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

export default wagmiConfig;

"use client";

import { BlockchainProvider, QueryProvider } from "providers";

import type { ReactNode } from "react";

/**
 * Application context providers.
 */
const Providers = ({ children }: { children: ReactNode }) => (
  <QueryProvider>
    <BlockchainProvider>{children}</BlockchainProvider>
  </QueryProvider>
);

export default Providers;

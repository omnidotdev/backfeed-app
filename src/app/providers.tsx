"use client";

import { BlockchainProvider, QueryProvider, ThemeProvider } from "providers";

import type { ReactNode } from "react";

/**
 * Application context providers.
 */
const Providers = ({ children }: { children: ReactNode }) => (
  <ThemeProvider>
    <QueryProvider>
      <BlockchainProvider>{children}</BlockchainProvider>
    </QueryProvider>
  </ThemeProvider>
);

export default Providers;

"use client";

import baseTheme from "lib/theme/baseTheme";
import { BlockchainProvider, QueryProvider, UIProvider } from "providers";

import type { ReactNode } from "react";

/**
 * Application context providers.
 */
const Providers = ({ children }: { children: ReactNode }) => (
  <QueryProvider>
    <BlockchainProvider>
      <UIProvider theme={baseTheme}>{children}</UIProvider>
    </BlockchainProvider>
  </QueryProvider>
);

export default Providers;

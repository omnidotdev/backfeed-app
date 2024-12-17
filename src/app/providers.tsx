"use client";

import {
  BlockchainProvider,
  QueryProvider,
  SearchParamsProvider,
  SessionProvider,
  ThemeProvider,
} from "providers";

import type { ReactNode } from "react";

/**
 * Application context providers.
 */
const Providers = ({ children }: { children: ReactNode }) => (
  <SessionProvider>
    <ThemeProvider>
      <SearchParamsProvider>
        <QueryProvider>
          <BlockchainProvider>{children}</BlockchainProvider>
        </QueryProvider>
      </SearchParamsProvider>
    </ThemeProvider>
  </SessionProvider>
);

export default Providers;

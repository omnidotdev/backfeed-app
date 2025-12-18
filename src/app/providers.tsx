"use client";

import { QueryProvider, SearchParamsProvider, ThemeProvider } from "providers";

import type { PropsWithChildren } from "react";

/**
 * Application context providers.
 */
const Providers = ({ children }: PropsWithChildren) => (
  <ThemeProvider>
    <SearchParamsProvider>
      <QueryProvider>{children}</QueryProvider>
    </SearchParamsProvider>
  </ThemeProvider>
);

export default Providers;

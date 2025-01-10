"use client";

import {
  QueryProvider,
  SearchParamsProvider,
  AuthProvider,
  ThemeProvider,
} from "providers";

import type { ReactNode } from "react";

/**
 * Application context providers.
 */
const Providers = ({ children }: { children: ReactNode }) => (
  <AuthProvider>
    <ThemeProvider>
      <SearchParamsProvider>
        <QueryProvider>{children}</QueryProvider>
      </SearchParamsProvider>
    </ThemeProvider>
  </AuthProvider>
);

export default Providers;

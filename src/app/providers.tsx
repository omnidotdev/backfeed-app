"use client";

import {
  AuthProvider,
  QueryProvider,
  SearchParamsProvider,
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

"use client";

import {
  AuthProvider,
  QueryProvider,
  SearchParamsProvider,
  ThemeProvider,
} from "providers";

import type { PropsWithChildren } from "react";

/**
 * Application context providers.
 */
const Providers = ({ children }: PropsWithChildren) => (
  <AuthProvider>
    <ThemeProvider>
      <SearchParamsProvider>
        <QueryProvider>{children}</QueryProvider>
      </SearchParamsProvider>
    </ThemeProvider>
  </AuthProvider>
);

export default Providers;

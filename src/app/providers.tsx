"use client";

import {
  AuthProvider,
  QueryProvider,
  SearchParamsProvider,
  ThemeProvider,
} from "providers";

import type { Session } from "next-auth";
import type { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  session: Session | null;
}

/**
 * Application context providers.
 */
const Providers = ({ session, children }: Props) => (
  // NB: key is used to force a re-mount when session changes
  <AuthProvider key={session?.user?.id} session={session}>
    <ThemeProvider>
      <SearchParamsProvider>
        <QueryProvider>{children}</QueryProvider>
      </SearchParamsProvider>
    </ThemeProvider>
  </AuthProvider>
);

export default Providers;

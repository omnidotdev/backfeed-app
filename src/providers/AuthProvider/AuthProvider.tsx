import { SessionProvider as AuthSessionProvider } from "next-auth/react";

import type { PropsWithChildren } from "react";

// 5 minutes
// NB: this should match the expiry time of the access token received from the IDP provider.
const DEFAULT_REFETCH_INTERVAL = 5 * 60;

/**
 * Auth session provider.
 */
const AuthProvider = ({ children }: PropsWithChildren) => (
  <AuthSessionProvider
    refetchInterval={DEFAULT_REFETCH_INTERVAL}
    refetchOnWindowFocus={false}
  >
    {children}
  </AuthSessionProvider>
);

export default AuthProvider;

import { SessionProvider as AuthSessionProvider } from "next-auth/react";

import type { SessionProviderProps } from "next-auth/react";

/**
 * Auth session provider.
 */
const AuthProvider = ({ session, children, ...rest }: SessionProviderProps) => (
  // NB: key is used to force a re-mount when session changes, See: https://github.com/nextauthjs/next-auth/issues/9504#issuecomment-2326123445
  <AuthSessionProvider
    key={session?.user?.customerId}
    session={session}
    {...rest}
  >
    {children}
  </AuthSessionProvider>
);

export default AuthProvider;

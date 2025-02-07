import { SessionProvider as AuthSessionProvider } from "next-auth/react";
import { useMemo } from "react";

import type { SessionProviderProps } from "next-auth/react";

/**
 * Auth session provider.
 */
const AuthProvider = ({ session, children, ...rest }: SessionProviderProps) => {
  const sessionKey = useMemo(() => session?.user?.customerId, [session]);

  return (
    // NB: key is used to force a re-mount when customerId changes, See: https://github.com/nextauthjs/next-auth/issues/9504#issuecomment-2326123445
    <AuthSessionProvider key={sessionKey} session={session} {...rest}>
      {children}
    </AuthSessionProvider>
  );
};

export default AuthProvider;

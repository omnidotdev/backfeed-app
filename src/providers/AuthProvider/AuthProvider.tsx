import { SessionProvider as AuthSessionProvider } from "next-auth/react";

import type { SessionProviderProps } from "next-auth/react";

/**
 * Auth session provider.
 */
const AuthProvider = ({ children, ...rest }: SessionProviderProps) => (
  <AuthSessionProvider {...rest}>{children}</AuthSessionProvider>
);

export default AuthProvider;

import { SessionProvider as AuthSessionProvider } from "next-auth/react";

import type { PropsWithChildren } from "react";

/**
 * Auth session provider.
 */
const AuthProvider = ({ children }: PropsWithChildren) => (
  <AuthSessionProvider>{children}</AuthSessionProvider>
);

export default AuthProvider;

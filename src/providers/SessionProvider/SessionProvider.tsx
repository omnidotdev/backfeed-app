import { SessionProvider as AuthSessionProvider } from "next-auth/react";

import type { PropsWithChildren } from "react";

/**
 * Auth session provider.
 */
const SessionProvider = ({ children }: PropsWithChildren) => (
  <AuthSessionProvider>{children}</AuthSessionProvider>
);

export default SessionProvider;

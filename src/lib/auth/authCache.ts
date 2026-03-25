import { createAuthCache, createOidcClient } from "@omnidotdev/providers/auth";

import { AUTH_INTERNAL_URL } from "@/lib/config/env.config";

export const oidc = createOidcClient({ authBaseUrl: AUTH_INTERNAL_URL! });
export const authCache = createAuthCache({ appName: "backfeed" });

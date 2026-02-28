import { createAuthCache, createOidcClient } from "@omnidotdev/providers";

import { AUTH_BASE_URL } from "@/lib/config/env.config";

export const oidc = createOidcClient({ authBaseUrl: AUTH_BASE_URL! });
export const authCache = createAuthCache({ appName: "backfeed" });

import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

import auth from "@/lib/auth/auth";
import { getAuth } from "@/lib/auth/getAuth";
import { buildIdpLogoutUrl } from "@/lib/auth/idpLogout";
import {
  AUTH_BASE_URL,
  AUTH_CLIENT_ID,
  BASE_URL,
} from "@/lib/config/env.config";

export const fetchSession = createServerFn().handler(async () => {
  const request = getRequest();

  const session = await getAuth(request);

  return { session };
});

/**
 * Build the IDP end_session URL for federated logout
 */
export function getIdpLogoutUrl(idTokenHint?: string): string | null {
  // Returns null (falling back to a local-only sign-out) unless every part is
  // present, including the id token: Gatekeeper's end-session endpoint requires
  // id_token_hint, so redirecting without it 400s and breaks sign-out. The id
  // token may be absent after a token refresh, which does not re-issue one.
  return buildIdpLogoutUrl({
    authBaseUrl: AUTH_BASE_URL,
    clientId: AUTH_CLIENT_ID,
    redirectUri: BASE_URL,
    idTokenHint,
  });
}

/**
 * Sign out from the local session (server-side)
 * Returns the IDP logout URL for federated logout redirect
 */
export const signOutLocal = createServerFn({ method: "POST" }).handler(
  async () => {
    const request = getRequest();
    const headers = request.headers;

    // Grab the ID token before we destroy the local session
    let idToken: string | undefined;
    try {
      const tokenResult = await auth.api.getAccessToken({
        body: { providerId: "omni" },
        headers,
      });
      idToken = tokenResult?.idToken;
    } catch {
      // Token may already be expired — proceed with logout anyway
    }

    await auth.api.signOut({ headers });

    return { idpLogoutUrl: getIdpLogoutUrl(idToken) };
  },
);

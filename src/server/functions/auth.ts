import { buildIdpLogoutUrl } from "@omnidotdev/providers/auth";
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";

import auth from "@/lib/auth/auth";
import { getAuth } from "@/lib/auth/getAuth";
import { isSessionDegraded } from "@/lib/auth/sessionState";
import {
  AUTH_BASE_URL,
  AUTH_CLIENT_ID,
  BASE_URL,
} from "@/lib/config/env.config";

export const fetchSession = createServerFn().handler(async () => {
  const request = getRequest();

  const session = await getAuth(request);

  // Recover the IDP user id (OIDC `sub` == a backfeed user's
  // `identityProviderId`) when getAuth could not supply it. getAuth derives it
  // from a short-lived auth-cache cookie or, failing that, a freshly minted id
  // token; in a degraded session (refresh-token grant failed) there is no fresh
  // token, so once the cache cookie has expired the id goes missing and every
  // id-dependent surface breaks (owner/admin controls hide, vote/comment
  // ownership, the profile link). The IDP id is also persisted as the `omni`
  // account's id on the Better Auth user, readable from the session cookie alone
  // (no access token), so read it back from there as the durable fallback.
  if (session && !session.user.identityProviderId) {
    try {
      const accounts = await auth.api.listUserAccounts({
        headers: request.headers,
      });
      const sub = accounts?.find(
        (account) => account.providerId === "omni",
      )?.accountId;
      if (sub) session.user.identityProviderId = sub;
    } catch (error) {
      console.error(
        "[fetchSession] Failed to recover identityProviderId from account:",
        error instanceof Error ? error.message : String(error),
      );
    }
  }

  // A degraded session is authenticated (getAuth returned it) but carries no
  // access token: the refresh-token grant failed, so getAuth served the session
  // without a fresh token and userinfo org hydration was skipped, leaving
  // organizations empty. This is distinct from a genuinely workspace-less user
  // (who has a valid access token), and the workspaces page uses it to prompt a
  // re-login instead of the silent "Create a workspace to get started" state
  return { session, authDegraded: isSessionDegraded(session) };
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
        body: { useAccountCookie: true },
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

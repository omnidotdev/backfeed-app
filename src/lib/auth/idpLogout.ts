/**
 * Build the IDP (Gatekeeper) OIDC end-session URL for federated logout.
 *
 * Pure and config-injected so it is testable without env. Returns null unless
 * every part is present, INCLUDING `idTokenHint`: Gatekeeper's end-session
 * endpoint requires `id_token_hint` and rejects a request without it, so a
 * caller that lacks the id token must fall back to a local-only sign-out rather
 * than redirect the browser into a validation error.
 */
export interface IdpLogoutConfig {
  /** IDP base URL, e.g. https://identity.omni.dev */
  authBaseUrl?: string;
  /** OAuth client id */
  clientId?: string;
  /** Post-logout redirect target (the app's own base URL) */
  redirectUri?: string;
  /** The user's id token; required by the end-session endpoint */
  idTokenHint?: string;
}

export const buildIdpLogoutUrl = ({
  authBaseUrl,
  clientId,
  redirectUri,
  idTokenHint,
}: IdpLogoutConfig): string | null => {
  if (!authBaseUrl || !clientId || !redirectUri || !idTokenHint) return null;

  const url = new URL(`${authBaseUrl}/oauth2/end-session`);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("post_logout_redirect_uri", redirectUri);
  url.searchParams.set("id_token_hint", idTokenHint);

  return url.toString();
};

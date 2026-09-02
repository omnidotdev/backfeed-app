import { HttpResponse, http } from "msw";

// Mirrors VITE_AUTH_BASE_URL in .env.test
const AUTH_BASE_URL = "https://localhost:8000";

/**
 * Mock OIDC discovery document.
 *
 * Better Auth's `genericOAuth` plugin fetches this eagerly on context init
 * since 1.7, so without a mock the auth module throws during any test that
 * transitively imports it
 */
const oidcDiscovery = {
  issuer: AUTH_BASE_URL,
  authorization_endpoint: `${AUTH_BASE_URL}/oauth2/authorize`,
  token_endpoint: `${AUTH_BASE_URL}/oauth2/token`,
  userinfo_endpoint: `${AUTH_BASE_URL}/oauth2/userinfo`,
  jwks_uri: `${AUTH_BASE_URL}/.well-known/jwks.json`,
  scopes_supported: ["openid", "profile", "email", "offline_access"],
  response_types_supported: ["code"],
  grant_types_supported: ["authorization_code", "refresh_token"],
  token_endpoint_auth_methods_supported: ["client_secret_post"],
  code_challenge_methods_supported: ["S256"],
};

/**
 * OIDC discovery endpoint mock.
 */
export const mockOidcDiscovery = http.get(
  `${AUTH_BASE_URL}/.well-known/openid-configuration`,
  () => HttpResponse.json(oidcDiscovery),
);

/**
 * JWKS endpoint mock (empty key set, tokens are not validated in tests).
 */
export const mockOidcJwks = http.get(
  `${AUTH_BASE_URL}/.well-known/jwks.json`,
  () => HttpResponse.json({ keys: [] }),
);

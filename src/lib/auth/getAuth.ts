import { GraphQLClient } from "graphql-request";
import * as jose from "jose";
import ms from "ms";

import { getSdk } from "@/generated/graphql.sdk";
import auth from "@/lib/auth/auth";
import { API_GRAPHQL_URL, AUTH_BASE_URL } from "@/lib/config/env.config";

const OMNI_CLAIMS_KEY = "https://manifold.omni.dev/@omni/claims/organizations";

/**
 * OIDC Discovery document structure.
 */
interface OIDCDiscovery {
  issuer: string;
  jwks_uri: string;
}

// Cache OIDC discovery and JWKS separately
let oidcDiscoveryCache: OIDCDiscovery | null = null;
let oidcDiscoveryCacheExpiry = 0;
let jwksCache: jose.JWTVerifyGetKey | null = null;
let jwksCacheExpiry = 0;

const OIDC_DISCOVERY_CACHE_TTL = ms("24h");
const JWKS_CACHE_TTL = ms("1h");

/**
 * Fetch OIDC discovery document.
 */
async function getOidcDiscovery(): Promise<OIDCDiscovery> {
  const now = Date.now();

  if (oidcDiscoveryCache && now < oidcDiscoveryCacheExpiry)
    return oidcDiscoveryCache;

  const discoveryUrl = new URL(
    "/.well-known/openid-configuration",
    AUTH_BASE_URL,
  );
  const response = await fetch(discoveryUrl);

  if (!response.ok)
    throw new Error(
      `OIDC discovery failed: ${response.status} ${response.statusText}`,
    );

  const discovery = (await response.json()) as OIDCDiscovery;

  if (!discovery.issuer || !discovery.jwks_uri)
    throw new Error("Invalid OIDC discovery document");

  oidcDiscoveryCache = discovery;
  oidcDiscoveryCacheExpiry = now + OIDC_DISCOVERY_CACHE_TTL;

  return discovery;
}

/**
 * Get JWKS using OIDC discovery.
 */
async function getJwks(): Promise<jose.JWTVerifyGetKey> {
  const now = Date.now();

  if (jwksCache && now < jwksCacheExpiry) {
    return jwksCache;
  }

  const discovery = await getOidcDiscovery();
  jwksCache = jose.createRemoteJWKSet(new URL(discovery.jwks_uri));
  jwksCacheExpiry = now + JWKS_CACHE_TTL;

  return jwksCache;
}

export interface OrganizationClaim {
  id: string;
  name: string;
  slug: string;
  type: "personal" | "team";
  roles: string[];
  teams: Array<{ id: string; name: string }>;
}

export async function getAuth(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) return null;

  // get access token and id token for GraphQL requests
  let accessToken: string | undefined;
  let identityProviderId: string | undefined;
  let organizations: OrganizationClaim[] | undefined;

  const tokenResult = await auth.api.getAccessToken({
    body: { providerId: "omni" },
    headers: request.headers,
  });
  accessToken = tokenResult?.accessToken;

  // extract claims from the ID token
  if (tokenResult?.idToken) {
    const [discovery, jwks] = await Promise.all([
      getOidcDiscovery(),
      getJwks(),
    ]);
    const { payload } = await jose.jwtVerify(tokenResult.idToken, jwks, {
      issuer: discovery.issuer,
    });
    identityProviderId = payload.sub;

    // extract organization claims from the ID token
    const orgClaims = payload[OMNI_CLAIMS_KEY];
    if (Array.isArray(orgClaims))
      organizations = orgClaims as OrganizationClaim[];
  }

  let rowId: string | undefined;

  // Fetch the current user via the observer query.
  // The API's authentication plugin automatically upserts the user on authenticated requests,
  // so the observer query returns the user directly from context (no separate DB lookup needed).
  if (accessToken) {
    const graphqlClient = new GraphQLClient(API_GRAPHQL_URL!, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const sdk = getSdk(graphqlClient);
    const result = await sdk.Observer();

    if (result.observer) {
      rowId = result.observer.rowId;
    }
  }

  const result = {
    ...session,
    accessToken,
    organizations,
    user: {
      ...session.user,
      rowId,
      identityProviderId,
      username: session.user.name || session.user.email,
    },
  };

  return result;
}

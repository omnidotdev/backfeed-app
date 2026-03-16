import {
  ensureFreshAccessToken,
  extractOrgClaims,
} from "@omnidotdev/providers/auth";
import { setCookie } from "@tanstack/react-start/server";
import { GraphQLClient } from "graphql-request";

import { getSdk } from "@/generated/graphql.sdk";
import auth from "@/lib/auth/auth";
import { authCache, oidc } from "@/lib/auth/authCache";
import { API_INTERNAL_GRAPHQL_URL } from "@/lib/config/env.config";

import type { OrganizationClaim } from "@omnidotdev/providers/auth";

export type { OrganizationClaim } from "@omnidotdev/providers/auth";

/**
 * Fetch rowId from GraphQL API by identity provider ID.
 */
async function fetchRowIdFromApi(
  accessToken: string,
  identityProviderId: string,
): Promise<string | null> {
  try {
    const graphqlClient = new GraphQLClient(API_INTERNAL_GRAPHQL_URL!, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const sdk = getSdk(graphqlClient);
    const { userByIdentityProviderId } = await sdk.User({
      identityProviderId,
    });

    return userByIdentityProviderId?.rowId ?? null;
  } catch (error) {
    console.error("[getAuth] Failed to fetch rowId:", error);
    return null;
  }
}

export async function getAuth(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) return null;

    let accessToken: string | undefined;
    let organizations: OrganizationClaim[] = [];

    // Cast to access custom session properties added by customSession plugin
    const customUser = session.user as typeof session.user & {
      identityProviderId?: string | null;
      rowId?: string | null;
      organizations?: OrganizationClaim[];
    };
    let identityProviderId = customUser.identityProviderId;
    let rowId = customUser.rowId;
    const cachedOrganizations = customUser.organizations;

    // Check if we have complete cached data (avoids API call on every request)
    const hasCachedData =
      rowId && identityProviderId && cachedOrganizations?.length;

    if (hasCachedData) {
      organizations = cachedOrganizations;
    }

    // Get tokens from HIDRA via Better Auth
    try {
      const tokenResult = await ensureFreshAccessToken({
        getAccessToken: () =>
          auth.api.getAccessToken({
            body: { providerId: "omni" },
            headers: request.headers,
          }),
        refreshToken: () =>
          auth.api.refreshToken({
            body: { providerId: "omni" },
            headers: request.headers,
          }),
      });
      accessToken = tokenResult?.accessToken;

      // Extract claims from ID token (verified via OIDC discovery + JWKS)
      if (tokenResult?.idToken) {
        try {
          const payload = await oidc.verifyIdToken(tokenResult.idToken);

          if (!identityProviderId) {
            identityProviderId = payload.sub ?? null;
          }

          if (!hasCachedData) {
            organizations = extractOrgClaims(payload);
          }
        } catch (jwtError) {
          console.error("[getAuth] JWT verification failed:", jwtError);
        }
      }

      // Handle rowId cache miss — fetch from API and cache
      if (!rowId && accessToken && identityProviderId) {
        rowId = await fetchRowIdFromApi(accessToken, identityProviderId);

        if (rowId) {
          const encrypted = await authCache.encrypt({
            rowId,
            identityProviderId,
            organizations,
          });
          setCookie(authCache.cookieName, encrypted, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: authCache.cookieTtlSeconds,
          });
        }
      }
    } catch (err) {
      console.error("[getAuth] Token fetch error:", err);
    }

    return {
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
  } catch (error) {
    console.error("[getAuth] Failed to get auth session:", error);
    return null;
  }
}

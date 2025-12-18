"use server";

import { GraphQLClient } from "graphql-request";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { headers } from "next/headers";
import { cache } from "react";

import { getSdk } from "generated/graphql.sdk";
import auth from "lib/auth/auth";
import { API_GRAPHQL_URL, AUTH_ISSUER_URL } from "lib/config";

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  rowId?: string;
  identityProviderId?: string;
  username?: string;
}

export interface AuthSession {
  accessToken?: string;
  user: AuthUser;
  session: {
    id: string;
    expiresAt: Date;
  };
}

/**
 * Get an authentication session from the server.
 */
async function getAuth(): Promise<AuthSession | null> {
  try {
    const reqHeaders = await headers();

    const session = await auth.api.getSession({
      headers: reqHeaders,
    });

    if (!session) {
      return null;
    }

    // Get access token and id token for GraphQL requests
    let accessToken: string | undefined;
    let identityProviderId: string | undefined;

    try {
      const tokenResult = await auth.api.getAccessToken({
        body: { providerId: "omni" },
        headers: reqHeaders,
      });
      accessToken = tokenResult?.accessToken;

      // extract the IDP user ID (sub) from the id token
      if (tokenResult?.idToken) {
        const jwks = createRemoteJWKSet(new URL(`${AUTH_ISSUER_URL}/jwks`));
        const { payload } = await jwtVerify(tokenResult.idToken, jwks);
        identityProviderId = payload.sub;
      }
    } catch (tokenError) {
      console.error(
        "[getAuthSession] Failed to get/verify tokens:",
        tokenError,
      );
    }

    let rowId: string | undefined;

    // fetch the database rowId using the IDP ID (identityProviderId from idToken.sub)
    if (accessToken && identityProviderId) {
      try {
        const graphqlClient = new GraphQLClient(API_GRAPHQL_URL!, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const sdk = getSdk(graphqlClient);
        const { userByIdentityProviderId } = await sdk.User({
          identityProviderId,
        });

        if (userByIdentityProviderId) {
          rowId = userByIdentityProviderId.rowId;
        }
      } catch (error) {
        console.error("[getAuthSession] Error fetching user rowId:", error);
      }
    }

    return {
      accessToken,
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name ?? undefined,
        rowId,
        identityProviderId,
        username: session.user.name || session.user.email,
      },
      session: {
        id: session.session.id,
        expiresAt: session.session.expiresAt,
      },
    };
  } catch (error) {
    console.error("[getAuthSession] Failed to get auth session:", error);
    return null;
  }
}

/**
 * Get a cached authentication session from the server.
 */
const getAuthSession = cache(getAuth);

export default getAuthSession;

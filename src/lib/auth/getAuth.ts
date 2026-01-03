import { GraphQLClient } from "graphql-request";
import { createRemoteJWKSet, jwtVerify } from "jose";

import { getSdk } from "@/generated/graphql.sdk";
import auth from "@/lib/auth/auth";
import { API_GRAPHQL_URL, AUTH_BASE_URL } from "@/lib/config/env.config";

export async function getAuth(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) return null;

    // get access token and id token for GraphQL requests
    let accessToken: string | undefined;
    let identityProviderId: string | undefined;

    try {
      const tokenResult = await auth.api.getAccessToken({
        body: { providerId: "omni" },
        headers: request.headers,
      });
      accessToken = tokenResult?.accessToken;

      // extract claims from the ID token
      if (tokenResult?.idToken) {
        const jwksUrl = `${AUTH_BASE_URL}/jwks`;
        const jwks = createRemoteJWKSet(new URL(jwksUrl));
        const { payload } = await jwtVerify(tokenResult.idToken, jwks);
        identityProviderId = payload.sub;
      }
    } catch (err) {
      console.error("[getAuth] Token/JWT error:", err);
    }

    let rowId: string | undefined;

    // fetch the database `rowId` using the IDP ID (`identityProviderId` from `idToken.sub`)
    if (accessToken && identityProviderId) {
      try {
        const graphqlClient = new GraphQLClient(API_GRAPHQL_URL!, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const sdk = getSdk(graphqlClient);

        const result = await sdk.User({
          identityProviderId,
        });

        if (result.userByIdentityProviderId)
          rowId = result.userByIdentityProviderId.rowId;
      } catch (error) {
        console.error(
          "[getAuth] Error fetching user rowId from GraphQL:",
          error,
        );
      }
    }

    const result = {
      ...session,
      accessToken,
      user: {
        ...session.user,
        rowId,
        identityProviderId,
        username: session.user.name || session.user.email,
      },
    };

    return result;
  } catch (error) {
    console.error("Failed to get auth session:", error);
    return null;
  }
}

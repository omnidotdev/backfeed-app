import { GraphQLClient } from "graphql-request";

import { getSdk } from "@/generated/graphql.sdk";
import {
  API_GRAPHQL_URL,
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
  AUTH_ISSUER,
  isDevEnv,
} from "@/lib/config/env.config";

import type { AuthConfig } from "@auth/core";
import type { CookieOption } from "@auth/core/types";

declare module "@auth/core/jwt" {
  interface JWT extends DefaultJWT {
    sub?: string;
    row_id?: string;
    preferred_username?: string;
    given_name?: string;
    family_name?: string;
    access_token: string;
    expires_at: number;
    refresh_token: string;
    error?: "RefreshTokenError";
  }
}

declare module "@auth/core/types" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    expires: Date;
    user: {
      rowId?: string;
      hidraId?: string;
      username?: string;
    } & DefaultUser;
    error?: "RefreshTokenError";
  }
}

interface UpdatedTokens {
  /** New access token. */
  access_token: string;
  /** Expiration time in seconds. */
  expires_in: number;
  /** New refresh token. */
  refresh_token: string;
}

/**
 * Shared cookie options required for cross-domain cookie processing flows. Without these, authentication breaks.
 */
const cookieOptions: Pick<CookieOption, "options"> = {
  options: {
    sameSite: "none",
  },
};

const authOptions: AuthConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET,
  basePath: "/api/auth",
  debug: isDevEnv,
  cookies: {
    sessionToken: cookieOptions,
    state: cookieOptions,
    pkceCodeVerifier: cookieOptions,
  },
  providers: [
    {
      // hint encryption algorithms from IDP; currently not correctly broadcast by Better Auth (https://github.com/better-auth/better-auth/pull/2326)
      client: {
        // TODO research security of these, they are from Better Auth, maybe tweakable if needed. Research quantum resistance
        authorization_signed_response_alg: "HS256",
        id_token_signed_response_alg: "HS256",
      },
      id: "omni",
      name: "Omni",
      type: "oidc",
      issuer: AUTH_ISSUER,
      clientId: AUTH_CLIENT_ID,
      clientSecret: AUTH_CLIENT_SECRET,
      checks: ["pkce", "state"],
      authorization: {
        params: {
          scope: "openid profile email offline_access",
          prompt: "consent",
        },
      },
    },
  ],
  callbacks: {
    jwt: async ({ token, profile, account }) => {
      if (account) {
        token.sub = profile?.sub!;
        token.preferred_username = profile?.preferred_username!;
        token.given_name = profile?.given_name!;
        token.family_name = profile?.family_name!;
        token.access_token = account.access_token!;
        token.expires_at = account.expires_at!;
        token.refresh_token = account.refresh_token!;

        const graphqlClient = new GraphQLClient(API_GRAPHQL_URL!, {
          headers: {
            Authorization: `Bearer ${account.access_token}`,
          },
        });

        const sdk = getSdk(graphqlClient);

        const { userByHidraId } = await sdk.User({ hidraId: token.sub });

        token.row_id = userByHidraId?.rowId;

        return token;
      }

      if (Date.now() < token.expires_at * 1000) return token;

      try {
        const response = await fetch(`${AUTH_ISSUER}/oauth2/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: AUTH_CLIENT_ID!,
            client_secret: AUTH_CLIENT_SECRET!,
            grant_type: "refresh_token",
            refresh_token: token.refresh_token,
          }),
        });

        const tokensOrError = await response.json();

        if (!response.ok) throw tokensOrError;

        const newTokens = tokensOrError as UpdatedTokens;

        return {
          ...token,
          access_token: newTokens.access_token,
          refresh_token: newTokens.refresh_token,
          expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
        };
      } catch (err) {
        console.error(err);
        token.error = "RefreshTokenError";

        return token;
      }
    },
    session: async ({ session, token }) => {
      session.user.hidraId = token.sub;
      session.user.rowId = token.row_id;
      session.user.username = token.preferred_username;
      session.accessToken = token.access_token;
      session.refreshToken = token.refresh_token;
      session.expires = new Date(token.expires_at * 1000);
      session.error = token.error;

      return session;
    },
  },
};

export default authOptions;

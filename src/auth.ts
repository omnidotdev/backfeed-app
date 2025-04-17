import { GraphQLClient } from "graphql-request";
import ms from "ms";
import NextAuth from "next-auth";

// import required for `next-auth/jwt` module augmentation: https://github.com/nextauthjs/next-auth/issues/9571#issuecomment-2143363518
import "next-auth/jwt";

import { getSdk } from "generated/graphql.sdk";
import { token } from "generated/panda/tokens";
import {
  API_BASE_URL,
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
  AUTH_ISSUER,
  isDevEnv,
} from "lib/config";

import type { User as NextAuthUser } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

/**
 * Augment the JWT interface with custom claims. See `callbacks` below, where the `jwt` callback is augmented.
 */
declare module "next-auth/jwt" {
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

/**
 * Augment the session interface with custom claims. See `callbacks` below, where the `session` callback is augmented.
 */
declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    expires: Date;
    user: {
      rowId?: string;
      hidraId?: string;
    } & NextAuthUser;
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
 * GraphQL client SDK.
 */
const sdk = ({ headers }: { headers?: HeadersInit } = {}) => {
  const graphqlClient = new GraphQLClient(API_BASE_URL!, {
    headers,
  });

  return getSdk(graphqlClient);
};

/**
 * Auth configuration.
 */
export const { handlers, auth } = NextAuth({
  debug: isDevEnv,
  trustHost: true,
  providers: [
    {
      client: {
        // ? unsure if necessary, needed to set this at least on first implementation of Better Auth integration
        authorization_signed_response_alg: "HS256",
        id_token_signed_response_alg: "HS256",
      },
      id: "omni",
      name: "Omni",
      type: "oidc",
      issuer: AUTH_ISSUER,
      clientId: AUTH_CLIENT_ID,
      clientSecret: AUTH_CLIENT_SECRET,
      authorization: {
        params: {
          // TODO fix, refresh tokens not granted (https://linear.app/omnidev/issue/OMNI-305/fix-refresh-token-flow)
          // scope: "openid profile email offline_access",
          // prompt: "consent",
        },
      },
      style: {
        // TODO custom auth pages (https://linear.app/omnidev/issue/OMNI-143/create-custom-auth-pages)
        brandColor: token("colors.brand.primary.500"),
        // TODO use Omni CDN (https://linear.app/omnidev/issue/OMNI-142/create-and-use-dedicated-cdn)
        logo: "/img/omni-logo.png",
      },
    },
  ],
  // Auth.js sanitizes the profile object (claims) by default, removing even claims that were requested by scopes. Configure `jwt` and `session` below to augment the profile. Be sure to augment the module declarations above if any changes are made for type safety
  callbacks: {
    // verify authentication within middleware
    authorized: async ({ auth }) => !!auth,
    // include additional claims in the token
    jwt: async ({ token, profile, account }) => {
      // account is present on fresh login, set additional claims on the token
      if (account) {
        token.sub = profile?.sub!;
        token.preferred_username = profile?.preferred_username!;
        token.given_name = profile?.given_name!;
        token.family_name = profile?.family_name!;
        token.access_token = account.access_token!;
        token.expires_at = account.expires_at!;
        token.refresh_token = account.refresh_token!;

        const user = await sdk({
          headers: { Authorization: `Bearer ${account.access_token}` },
        }).User({
          hidraId: token.sub!,
        });

        token.row_id = user?.userByHidraId?.rowId;

        return token;
      }

      if (Date.now() < token.expires_at * ms("1s")) return token;

      try {
        const response = await fetch(
          // TODO verify this is correct path
          `${AUTH_ISSUER}/oauth2/token`,
          {
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
          },
        );

        const tokensOrError = await response.json();

        if (!response.ok) throw tokensOrError;

        const newTokens = tokensOrError as UpdatedTokens;

        return {
          ...token,
          access_token: newTokens.access_token,
          refresh_token: newTokens.refresh_token,
          expires_at: Math.floor(Date.now() / ms("1s") + newTokens.expires_in),
        };
      } catch (err) {
        console.error(err);
        token.error = "RefreshTokenError";

        return token;
      }
    },
    // augment the session object with custom claims (these are forwarded to the client, e.g. for the `useSession` hook)
    session: async ({ session, token }) => {
      session.user.hidraId = token.sub;
      session.user.rowId = token.row_id;
      session.accessToken = token.access_token;
      session.refreshToken = token.refresh_token;
      session.expires = new Date(token.expires_at * ms("1s"));
      session.error = token.error;

      return session;
    },
  },
});

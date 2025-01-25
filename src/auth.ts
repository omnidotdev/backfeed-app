import { GraphQLClient } from "graphql-request";
import ms from "ms";
import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

// import required for `next-auth/jwt` module augmentation: https://github.com/nextauthjs/next-auth/issues/9571#issuecomment-2143363518
import "next-auth/jwt";

import { getSdk } from "generated/graphql.sdk";
import { token } from "generated/panda/tokens";
import { isDevEnv } from "lib/config";

import type { User as NextAuthUser } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

/**
 * GraphQL client SDK.
 */
const sdk = ({ headers }: { headers?: HeadersInit } = {}) => {
  const graphqlClient = new GraphQLClient(
    process.env.NEXT_PUBLIC_API_BASE_URL!,
    { headers }
  );

  return getSdk(graphqlClient);
};

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
  }
}

/**
 * Auth configuration.
 */
export const { handlers, auth } = NextAuth({
  debug: isDevEnv,
  session: {
    // 30 minutes
    // ! NB: this should match the expiry time of the refresh token from the IDP
    maxAge: 60 * 30,
  },
  providers: [
    Keycloak({
      clientId: process.env.AUTH_KEYCLOAK_ID!,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET!,
      issuer: process.env.AUTH_KEYCLOAK_ISSUER!,
      id: "omni",
      name: "Omni",
      style: {
        // TODO custom auth pages (https://linear.app/omnidev/issue/OMNI-143/create-custom-auth-pages)
        brandColor: token("colors.brand.primary.500"),
        // TODO use Omni CDN (https://linear.app/omnidev/issue/OMNI-142/create-and-use-dedicated-cdn)
        logo: "/img/omni-logo.png",
      },
    }),
  ],
  // Auth.js sanitizes the profile object (claims) by default, removing even claims that were requested by scopes. Configure `jwt` and `session` below to augment the profile. Be sure to augment the module declarations above if any changes are made for type safety
  callbacks: {
    // verify authentication within middleware
    authorized: async ({ auth }) => !!auth,
    // include additional claims in the token
    jwt: async ({ token, profile, account }) => {
      // Account is present on fresh login. We can set additional claims on the token given this information.
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

      return token;
    },
    // augment the session object with custom claims (these are forwarded to the client, e.g. for the `useSession` hook)
    session: async ({ session, token }) => {
      session.user.hidraId = token.sub;
      session.user.rowId = token.row_id;
      session.accessToken = token.access_token;
      session.refreshToken = token.refresh_token;
      session.expires = new Date(token.expires_at * ms("1s"));

      return session;
    },
  },
});

import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

// import required for `next-auth/jwt` module augmentation: https://github.com/nextauthjs/next-auth/issues/9571#issuecomment-2143363518
import "next-auth/jwt";

import { token } from "generated/panda/tokens";
import { sdk } from "lib/graphql";

import type { User as NextAuthUser } from "next-auth";

import type { DefaultJWT } from "next-auth/jwt";

const fetchUserProfileClaims = async (accessToken: string) =>
  await fetch(
    `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/userinfo`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

const refreshAccessToken = async (refreshToken: string) =>
  await fetch(
    `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.AUTH_KEYCLOAK_ID!,
        client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    }
  );

/**
 * Augment the JWT interface with custom claims. See `callbacks` below, where the `jwt` callback is augmented.
 */
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    sub?: string;
    id_token?: string;
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
    expires: Date;
    user: {
      rowId?: string;
      hidraId?: string;
      idToken?: string;
    } & NextAuthUser;
  }
}

/**
 * Auth configuration.
 */
export const { handlers, auth } = NextAuth({
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
    // include additional claims in the token
    jwt: async ({ token, profile, account }) => {
      // retrieve user row ID from database using the access token granted by IDP
      const setRowIdClaim = async (accessToken: string) => {
        const user = await sdk({
          headers: { Authorization: `Bearer ${accessToken}` },
        }).User({
          hidraId: token.sub!,
        });

        token.row_id = user?.userByHidraId?.rowId;
      };

      // Account is present on fresh login. We can set additional claims on the token given this information.
      if (account) {
        token.sub = profile?.sub!;
        token.preferred_username = profile?.preferred_username!;
        token.given_name = profile?.given_name!;
        token.family_name = profile?.family_name!;
        token.id_token = account.id_token;
        token.access_token = account.access_token!;
        token.expires_at = account.expires_at!;
        token.refresh_token = account.refresh_token!;

        await setRowIdClaim(account.access_token!);

        return token;
      }

      return token;
    },
    // augment the session object with custom claims (these are forwarded to the client, e.g. for the `useSession` hook)
    session: async ({ session, token }) => {
      session.user.hidraId = token.sub;
      session.user.rowId = token.row_id;
      session.user.idToken = token.id_token;
      session.accessToken = token.access_token;
      session.expires = new Date(token.expires_at * 1000);

      return session;
    },
  },
});

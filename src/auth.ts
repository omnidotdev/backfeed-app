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
    error?: "RefreshTokenError";
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
    error?: "RefreshTokenError";
  }
}

/**
 * Auth configuration.
 */
export const { handlers, auth } = NextAuth({
  session: {
    strategy: "jwt",
    updateAge: 0,
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

      // On subsequent logins, where the access token is still valid, we can use the existing token.
      if (Date.now() < token.expires_at * 1000) {
        const response = await fetchUserProfileClaims(token.access_token!);

        const { preferred_username, given_name, family_name, ...rest } =
          await response.json();

        // TODO: discuss. This is ALWAYS true once the user claims are updated.
        const userClaimsHaveChanged =
          preferred_username !== token.preferred_username ||
          given_name !== token.given_name ||
          family_name !== token.family_name;

        if (userClaimsHaveChanged) {
          const refreshTokenResponse = await refreshAccessToken(
            token.refresh_token!
          );

          if (refreshTokenResponse.ok) {
            const { access_token, expires_in, refresh_token } =
              await refreshTokenResponse.json();

            token.access_token = access_token;
            token.expires_at = Math.floor(Date.now() / 1000 + expires_in);
            token.refresh_token = refresh_token;

            await setRowIdClaim(access_token);

            return token;
          }
        }

        return token;
      }

      // If the access token is expired, we need to refresh it.
      try {
        const response = await refreshAccessToken(token.refresh_token!);

        const tokensOrError = await response.json();

        // If the refresh token is invalid, we can't refresh the access token, so we need to throw an error, and handle it within the catch block.
        if (!response.ok) throw tokensOrError;

        const newTokens = tokensOrError as {
          access_token: string;
          expires_in: number;
          refresh_token: string;
        };

        token.access_token = newTokens.access_token;
        token.expires_at = Math.floor(Date.now() / 1000 + newTokens.expires_in);
        token.refresh_token = newTokens.refresh_token;

        await setRowIdClaim(newTokens.access_token);

        return token;
      } catch (error) {
        token.error = "RefreshTokenError";

        return token;
      }
    },
    // augment the session object with custom claims (these are forwarded to the client, e.g. for the `useSession` hook)
    session: async ({ session, token }) => {
      if (token.error) {
        // Forward the error to the client, so it can be handled appropriately.
        session.error = token.error;

        return session;
      }

      session.user.hidraId = token.sub;
      session.user.rowId = token.row_id;
      session.user.idToken = token.id_token;
      session.accessToken = token.access_token;
      session.expires = new Date(token.expires_at * 1000);

      return session;
    },
  },
});

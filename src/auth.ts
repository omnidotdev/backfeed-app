import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

// import required for `next-auth/jwt` module augmentation: https://github.com/nextauthjs/next-auth/issues/9571#issuecomment-2143363518
import "next-auth/jwt";

import { token } from "generated/panda/tokens";

import type { User as NextAuthUser } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";
import { sdk } from "lib/graphql";

/**
 * Augment the JWT interface with custom claims. See `callbacks` below, where the `jwt` callback is augmented.
 */
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    given_name?: string;
    family_name?: string;
    preferred_username?: string;
    sub?: string;
  }
}

/**
 * Augment the session interface with custom claims. See `callbacks` below, where the `session` callback is augmented.
 */
declare module "next-auth" {
  interface Session {
    user: {
      rowId?: string;
      hidraId?: string;
      firstName?: string;
      lastName?: string;
      username?: string;
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
    jwt: async ({ token, profile }) => {
      if (profile) {
        // NB: Auth.js makes its own rotating `sub`, not to be confused with the IDP `sub`. Auth.js sets this on `token.sub` by default, so it is overwritten here
        if (profile.sub) token.sub = profile.sub;
        if (profile.given_name) token.given_name = profile.given_name;
        if (profile.family_name) token.family_name = profile.family_name;
        if (profile.preferred_username)
          token.preferred_username = profile.preferred_username;
      }

      // create or update local app user
      // TODO refactor to simple upsert (one mutation) (https://linear.app/omnidev/issue/OMNI-144/set-up-upsert-mutations-plugin)
      // TODO refactor to more robust app database sync method, e.g. periodic sync or event-driven activity like webhooks (https://linear.app/omnidev/issue/OMNI-145/set-up-event-driven-architecture-for-local-app-db-user-sync)
      const user = await sdk.User({ hidraId: token.sub! });

      if (!user.userByHidraId) {
        // create app user synced with IDP user
        await sdk.CreateUser({
          hidraId: token.sub!,
          username: token.preferred_username,
          firstName: token.given_name,
          lastName: token.family_name,
        });
      } else {
        // update app user if any fields have changed
        if (
          ["username", "firstName", "lastName"].some(
            (field) =>
              user.userByHidraId?.[field as keyof typeof user.userByHidraId] !==
              token[field]
          )
        ) {
          await sdk.UpdateUser({
            hidraId: token.sub!,
            patch: {
              username: token.preferred_username,
              firstName: token.given_name,
              lastName: token.family_name,
            },
          });
        }
      }

      return token;
    },
    // augment the session object with custom claims (these are forwarded to the client, e.g. for the `useSession` hook)
    session: async ({ session, token }) => {
      session.user.hidraId = token.sub;
      session.user.firstName = token.given_name;
      session.user.lastName = token.family_name;
      session.user.username = token.preferred_username;

      // retrieve user by Hidra ID
      const { userByHidraId } = await sdk.User({ hidraId: token.sub! });

      if (userByHidraId) {
        session.user.rowId = userByHidraId.rowId;
      }

      return session;
    },
  },
});

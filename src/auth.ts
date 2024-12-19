import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

// import required for `next-auth/jwt` module augmentation: https://github.com/nextauthjs/next-auth/issues/9571#issuecomment-2143363518
import "next-auth/jwt";

import type { User as NextAuthUser } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

/**
 * Augment the JWT interface with custom claims. See `callbacks` below, where the `jwt` callback is augmented.
 */
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    given_name?: string;
    family_name?: string;
  }
}

/**
 * Augment the session interface with custom claims. See `callbacks` below, where the `session` callback is augmented.
 */
declare module "next-auth" {
  interface Session {
    user: {
      firstName?: string;
      lastName?: string;
    } & NextAuthUser;
  }
}

/**
 * Auth configuration.
 */
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Keycloak config is pulled from environment variables: https://authjs.dev/getting-started/providers/keycloak#configuration
    Keycloak,
  ],
  // Auth.js sanitizes the profile object (claims) by default, removing even claims that were requested by scopes. Configure `jwt` and `session` below to augment the profile. Be sure to augment the module declarations above if any changes are made for type safety
  callbacks: {
    // include additional claims in the access token
    jwt: async ({ token, account, profile }) => {
      if (profile) {
        if (profile.given_name) token.given_name = profile.given_name;
        if (profile.family_name) token.family_name = profile.family_name;
      }

      return token;
    },
    // augment the session object with custom claims
    session: async ({ session, token }) => {
      session.user.firstName = token.given_name;
      session.user.lastName = token.family_name;

      return session;
    },
  },
});

import { betterAuth } from "better-auth/minimal";
import { nextCookies } from "better-auth/next-js";
import { genericOAuth } from "better-auth/plugins";

import {
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
  AUTH_ISSUER_URL,
  BASE_URL,
} from "lib/config";

const { AUTH_SECRET } = process.env;

/**
 * Auth server client.
 */
const auth = betterAuth({
  baseURL: BASE_URL,
  basePath: "/api/auth",
  secret: AUTH_SECRET,
  session: {
    // extend session expiration to 30 days
    expiresIn: 60 * 60 * 24 * 30,
    // refresh session if older than 1 day
    updateAge: 60 * 60 * 24,
    // enable cookie caching for stateless session validation
    cookieCache: {
      enabled: true,
      // cache session in cookie for 5 minutes before re-validating
      maxAge: 60 * 5,
    },
  },
  account: {
    // store OAuth tokens (access token, refresh token) in a signed cookie for stateless mode to enable automatic token refresh without a database
    storeAccountCookie: true,
  },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "omni",
          clientId: AUTH_CLIENT_ID!,
          clientSecret: AUTH_CLIENT_SECRET!,
          discoveryUrl: `${AUTH_ISSUER_URL}/.well-known/openid-configuration`,
          scopes: ["openid", "profile", "email", "offline_access"],
          prompt: "consent",
          accessType: "offline",
          pkce: true,
        },
      ],
    }),
    // NB: must be the last plugin in the array
    nextCookies(),
  ],
});

export default auth;

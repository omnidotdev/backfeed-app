/**
 * Environment variables.
 */
export const {
  // core
  VITE_BASE_URL: BASE_URL,
  VITE_API_BASE_URL: API_BASE_URL,
  VITE_AUTH_BASE_URL: AUTH_BASE_URL,
  VITE_BILLING_BASE_URL: BILLING_BASE_URL,
  // auth (server-side secrets)
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
} = { ...import.meta.env, ...process.env };

export const API_GRAPHQL_URL = `${API_BASE_URL}/graphql`;

// environment helpers
export const isDevEnv = import.meta.env.DEV;
// NB: `APP_ENV` is used instead of `NODE_ENV` because `next dev` shadows `NODE_ENV`, so even if `NODE_ENV=test` is injected into the environment, it will be overwritten to "development". See https://github.com/vercel/next.js/issues/17032
const isTestEnv = import.meta.env.NODE_ENV === "test";

// tests
// enable mock service worker (https://mswjs.io/docs/integrations/browser#conditionally-enable-mocking), this is wrapped in case mocking requests and responses during development is desired
/** @knipignore */
export const ENABLE_MSW = process.env.ENABLE_MSW || isTestEnv;

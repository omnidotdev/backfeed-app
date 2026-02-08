/**
 * Environment variables.
 */
export const {
  // core
  VITE_BASE_URL: BASE_URL,
  VITE_API_BASE_URL: API_BASE_URL,
  VITE_AUTH_BASE_URL: AUTH_BASE_URL,
  VITE_BILLING_BASE_URL: BILLING_BASE_URL,
  VITE_SELF_HOSTED,
  SELF_HOSTED,
  // auth (server-side secrets)
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
  // feature flags
  VITE_FLAGS_API_HOST: FLAGS_API_HOST,
  VITE_FLAGS_CLIENT_KEY: FLAGS_CLIENT_KEY,
} = { ...import.meta.env, ...process.env };

export const CONSOLE_URL = import.meta.env.VITE_CONSOLE_URL;

export const API_GRAPHQL_URL = `${API_BASE_URL}/graphql`;

// Internal API URL for server-to-server communication (Docker service name)
// Falls back to API_BASE_URL for non-Docker environments
const API_INTERNAL_URL =
  typeof window === "undefined"
    ? process.env.API_INTERNAL_URL || API_BASE_URL
    : API_BASE_URL;

// Internal GraphQL URL for server-side requests
export const API_INTERNAL_GRAPHQL_URL = `${API_INTERNAL_URL}/graphql`;

// environment helpers
export const isDevEnv = import.meta.env.DEV;
/** @knipignore */
export const isProdEnv = import.meta.env.PROD;
// NB: `APP_ENV` is used instead of `NODE_ENV` because `next dev` shadows `NODE_ENV`, so even if `NODE_ENV=test` is injected into the environment, it will be overwritten to "development". See https://github.com/vercel/next.js/issues/17032
const isTestEnv = import.meta.env.NODE_ENV === "test";

// tests
// enable mock service worker (https://mswjs.io/docs/integrations/browser#conditionally-enable-mocking), this is wrapped in case mocking requests and responses during development is desired
/** @knipignore */
export const ENABLE_MSW = process.env.ENABLE_MSW || isTestEnv;
export const isSelfHosted =
  SELF_HOSTED === "true" || VITE_SELF_HOSTED === "true";

/**
 * Billing provider to use.
 * - "local" for self-hosted (all features unlocked)
 * - "aether" for SaaS (billing service)
 */
export const billingProvider: "local" | "aether" = isSelfHosted
  ? "local"
  : "aether";

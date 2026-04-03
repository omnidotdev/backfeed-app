/**
 * Environment variables.
 */
// Build-time vars take precedence to prevent SSR hydration mismatch
const env =
  typeof window === "undefined"
    ? { ...process.env, ...import.meta.env }
    : import.meta.env;

export const {
  // core
  VITE_BASE_URL: BASE_URL,
  VITE_API_BASE_URL: API_BASE_URL,
  VITE_AUTH_BASE_URL: AUTH_BASE_URL,
  VITE_BILLING_BASE_URL: BILLING_BASE_URL,
  // auth (server-side secrets)
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,

  // feature flags
  VITE_FLAGS_API_HOST: FLAGS_API_HOST,
  VITE_FLAGS_CLIENT_KEY: FLAGS_CLIENT_KEY,
} = env;

// Internal auth URL for server-to-server communication (Docker service name)
// Falls back to AUTH_BASE_URL for non-Docker environments
export const AUTH_INTERNAL_URL =
  typeof window === "undefined"
    ? process.env.AUTH_INTERNAL_URL || AUTH_BASE_URL
    : AUTH_BASE_URL;

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
export const hasBilling = !!BILLING_BASE_URL;

/**
 * Billing provider to use.
 * - "aether" when billing service is configured
 * - "local" otherwise (all features unlocked)
 */
export const billingProvider: "local" | "aether" = hasBilling
  ? "aether"
  : "local";

// Startup warnings for optional integrations
if (!BILLING_BASE_URL)
  console.warn("BILLING_BASE_URL not set, billing disabled");
if (!FLAGS_API_HOST)
  console.warn("FLAGS_API_HOST not set, feature flags disabled");

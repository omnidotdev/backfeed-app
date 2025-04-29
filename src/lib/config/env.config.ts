// core
const NODE_ENV = process.env.NODE_ENV;
const APP_ENV = process.env.APP_ENV;
export const NEXT_RUNTIME = process.env.NEXT_RUNTIME;
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const API_GRAPHQL_URL = process.env.NEXT_PUBLIC_API_GRAPHQL_URL;

// simplified environment helpers
export const isDevEnv = NODE_ENV === "development";
// NB: `APP_ENV` is used instead of `NODE_ENV` because `next dev` shadows `NODE_ENV`, so even if `NODE_ENV=test` is injected into the environment, it will be overwritten to "development". See https://github.com/vercel/next.js/issues/17032
const isTestEnv = APP_ENV === "test";

// auth
export const AUTH_ISSUER = process.env.NEXT_PUBLIC_AUTH_ISSUER;
export const AUTH_CLIENT_ID = process.env.AUTH_CLIENT_ID;
export const AUTH_CLIENT_SECRET = process.env.AUTH_CLIENT_SECRET;

// payment processing
export const ENABLE_POLAR_SANDBOX =
  process.env.NEXT_PUBLIC_ENABLE_POLAR_SANDBOX === "true";

// emails
export const FROM_EMAIL_ADDRESS = process.env.NEXT_PUBLIC_FROM_EMAIL_ADDRESS;
export const TO_EMAIL_ADDRESS = process.env.NEXT_PUBLIC_TO_EMAIL_ADDRESS;

// tests
// enable mock service worker (https://mswjs.io/docs/integrations/browser#conditionally-enable-mocking), this is wrapped in case mocking requests and responses during development is desired
export const ENABLE_MSW = process.env.ENABLE_MSW || isTestEnv;

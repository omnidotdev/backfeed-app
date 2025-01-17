// core
const NODE_ENV = process.env.NODE_ENV;
const APP_ENV = process.env.APP_ENV;
export const NEXT_RUNTIME = process.env.NEXT_RUNTIME;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// auth
export const AUTH_KEYCLOAK_ISSUER = process.env.AUTH_KEYCLOAK_ISSUER;

// simplified environment helpers
/** @knipignore TODO remove this directive once `isProdEnv` is used */
export const isProdEnv = NODE_ENV === "production";
export const isDevEnv = NODE_ENV === "development";
// NB: `APP_ENV` is used instead of `NODE_ENV` because `next dev` shadows `NODE_ENV`, so even if `NODE_ENV=test` is injected into the environment, it will be overwritten to "development". See https://github.com/vercel/next.js/issues/17032
/** @knipignore `isTestEnv` is used below, but Knip doesn't detect it */
export const isTestEnv = APP_ENV === "test";

// tests
// enable mock service worker (https://mswjs.io/docs/integrations/browser#conditionally-enable-mocking), this is wrapped in case mocking requests and responses during development is desired
export const ENABLE_MSW = process.env.ENABLE_MSW || isTestEnv;

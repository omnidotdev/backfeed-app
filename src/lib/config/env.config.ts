// core
const NODE_ENV = import.meta.env.NODE_ENV;
export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_GRAPHQL_URL = `${API_BASE_URL}/graphql`;

// simplified environment helpers
export const isDevEnv = NODE_ENV === "development";
// NB: `APP_ENV` is used instead of `NODE_ENV` because `next dev` shadows `NODE_ENV`, so even if `NODE_ENV=test` is injected into the environment, it will be overwritten to "development". See https://github.com/vercel/next.js/issues/17032
const isTestEnv = NODE_ENV === "test";

// auth
export const AUTH_ISSUER = import.meta.env.VITE_AUTH_ISSUER;
export const AUTH_CLIENT_ID = process.env.AUTH_CLIENT_ID;
export const AUTH_CLIENT_SECRET = process.env.AUTH_CLIENT_SECRET;

// emails
export const FROM_EMAIL_ADDRESS = import.meta.env.VITE_FROM_EMAIL_ADDRESS;
export const TO_EMAIL_ADDRESS = import.meta.env.VITE_TO_EMAIL_ADDRESS;

// payment processing
// customer portal session configuration: https://docs.stripe.com/api/customer_portal/sessions/create#create_portal_session-configuration
export const STRIPE_PORTAL_CONFIG_ID = import.meta.env
  .VITE_STRIPE_PORTAL_CONFIG_ID;

// tests
// enable mock service worker (https://mswjs.io/docs/integrations/browser#conditionally-enable-mocking), this is wrapped in case mocking requests and responses during development is desired
export const ENABLE_MSW = process.env.ENABLE_MSW || isTestEnv;

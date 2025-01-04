// core
const NODE_ENV = process.env.NODE_ENV;
const APP_ENV = process.env.APP_ENV;
export const NEXT_RUNTIME = process.env.NEXT_RUNTIME;
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// web3
export const WALLETCONNECT_PROJECT_ID = process.env.WALLETCONNECT_PROJECT_ID;

// TODO: remove once keycloak / hidra are synced with database
export const MOCK_USER_ID = process.env.NEXT_PUBLIC_MOCK_USER_ID;

// simplified environment helpers
/** @knipignore TODO remove this directive once `isProdEnv` is used */
export const isProdEnv = NODE_ENV === "production";
/** @knipignore TODO remove this directive once `isDevEnv` is used */
export const isDevEnv = NODE_ENV === "development";
// NB: `APP_ENV` is used instead of `NODE_ENV` because `next dev` shadows `NODE_ENV`, so even if `NODE_ENV=test` is injected into the environment, it will be overwritten to "development". See https://github.com/vercel/next.js/issues/17032
export const isTestEnv = APP_ENV === "test";

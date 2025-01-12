// core
/** @knipignore TODO remove this directive once `NODE_ENV` is used */
export const NODE_ENV = process.env.NODE_ENV;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const AUTH_KEYCLOAK_ISSUER = process.env.AUTH_KEYCLOAK_ISSUER;

// TODO: remove once keycloak / hidra are synced with database and mock data is no longer needed
export const MOCK_USER_ID = process.env.NEXT_PUBLIC_MOCK_USER_ID;

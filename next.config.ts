import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // enable standalone mode for running in a container (https://github.com/vercel/next.js/tree/canary/examples/with-docker#in-existing-projects)
  output: "standalone",
  // TODO: discuss. See: https://nextjs.org/docs/app/api-reference/config/next-config-js/inlineCss
  // experimental: {
  //   inlineCss: true,
  // },
  env: {
    // below are safe to be public, but `NEXT_PUBLIC_` is not used because Auth.js uses these to automatically set its own Keycloak provider configuration
    AUTH_KEYCLOAK_ID: process.env.AUTH_KEYCLOAK_ID,
    AUTH_KEYCLOAK_ISSUER: process.env.AUTH_KEYCLOAK_ISSUER,
  },
};

export default nextConfig;

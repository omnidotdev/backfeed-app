import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // enable standalone mode for running in a container (https://github.com/vercel/next.js/tree/canary/examples/with-docker#in-existing-projects)
  output: "standalone",
  env: {
    // below are safe to be public, but `NEXT_PUBLIC_` is not used because Auth.js uses these to automatically set its own Keycloak provider configuration
    AUTH_KEYCLOAK_ID: process.env.AUTH_KEYCLOAK_ID,
    AUTH_KEYCLOAK_ISSUER: process.env.AUTH_KEYCLOAK_ISSUER,
  },
  async headers() {
    return [
      {
        source: "/(.*?)", // apply headers to all paths
        headers: [
          // Enables DNS prefetching for faster resource loading
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // Enforces HTTPS usage and allows preload list inclusion
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // Prevents the site from being embedded in iframes from other domains (clickjacking protection)
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'",
          },
          // Prevents the browser from guessing (sniffing) the MIME type
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Enables legacy XSS protection mode in older browsers
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Disallows your site from being framed by other origins (legacy equivalent of CSP `frame-ancestors`)
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // Restricts how much referrer information is sent with requests to other sites
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Opts the origin into its own memory/process context (Spectre defense)
          {
            key: "Origin-Agent-Cluster",
            value: "?1",
          },
          // Prevents other origins from loading your resources unless allowed
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          // Controls access to browser features like geolocation, camera, mic, fullscreen, etc.
          {
            key: "Permissions-Policy",
            value:
              "geolocation=(), microphone=(), camera=(), fullscreen=(), payment=()",
          },
          // Blocks legacy Adobe plugins (like Flash) from loading cross-domain data
          {
            key: "X-Permitted-Cross-Domain-Policies",
            value: "none",
          },
        ],
      },
    ];
  },
};
export default nextConfig;

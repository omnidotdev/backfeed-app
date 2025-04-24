import type { NextConfig } from "next";

/**
 * CORS headers.
 */
const corsHeaders = [
  { key: "Access-Control-Allow-Credentials", value: "true" },
  {
    key: "Access-Control-Allow-Origin",
    // TODO remove this split once `NEXT_PUBLIC_AUTH_ISSUER` set to base URL (https://linear.app/omnidev/issue/OMNI-254/move-apiauth-paths-to-base-path-or-subpath-eg-auth)
    value: process.env.NEXT_PUBLIC_AUTH_ISSUER!.split("/api")[0],
  },
];

const nextConfig: NextConfig = {
  // enable standalone mode for running in a container (https://github.com/vercel/next.js/tree/canary/examples/with-docker#in-existing-projects)
  output: "standalone",
  headers: async () => [
    {
      // apply headers to all paths
      source: "/(.*?)",
      headers: [
        //       // prefetch DNS records in browse for faster loading
        //       {
        //         key: "X-DNS-Prefetch-Control",
        //         value: "on",
        //       },
        //       // force HTTPS usage and allow preload list inclusion
        //       {
        //         key: "Strict-Transport-Security",
        //         value: "max-age=63072000; includeSubDomains; preload",
        //       },
        //       // prevent the site from being embedded in iframes from other domains (clickjacking protection)
        //       {
        //         key: "Content-Security-Policy",
        //         value: "frame-ancestors 'self'",
        //       },
        //       // prevent the browser from guessing (sniffing) the MIME type
        //       {
        //         key: "X-Content-Type-Options",
        //         value: "nosniff",
        //       },
        //       // enable legacy XSS protection mode in older browsers; 1 enables XSS protection and block mode prevents the page from loading if an attack is detected
        //       {
        //         key: "X-XSS-Protection",
        //         value: "1; mode=block",
        //       },
        //       // block site from being framed by other origins (legacy equivalent of CSP `frame-ancestors`)
        //       {
        //         key: "X-Frame-Options",
        //         value: "SAMEORIGIN",
        //       },
        //       // restrict how much referrer information is sent with requests to other sites
        //       {
        //         key: "Referrer-Policy",
        //         value: "strict-origin-when-cross-origin",
        //       },
        //       // opt the origin into its own memory/process context (Spectre defense)
        //       {
        //         key: "Origin-Agent-Cluster",
        //         value: "?1",
        //       },
        //       // prevent other origins from loading resources unless allowed
        //       {
        //         key: "Cross-Origin-Resource-Policy",
        //         value: "same-origin",
        //       },
        //       // TODO discuss which permissions are needed/if they are needed at all
        //       {
        //         key: "Permissions-Policy",
        //         value: "geolocation=(), microphone=(), camera=(), fullscreen=()",
        //       },
        //       // block legacy Adobe plugins (i.e. Flash) from loading cross-domain data
        //       {
        //         key: "X-Permitted-Cross-Domain-Policies",
        //         value: "none",
        //       },
        // set CORS headers for identity provider
        ...corsHeaders,
      ],
    },
  ],
};

export default nextConfig;

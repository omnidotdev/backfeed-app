import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // enable standalone mode for running in a container (https://github.com/vercel/next.js/tree/canary/examples/with-docker#in-existing-projects)
  output: "standalone",
  env: {},
  async headers() {
    return [
      {
        // apply headers to all paths
        source: "/(.*?)",
        headers: [
          // Allow browser to prefetch DNS records for faster loading
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          // Forces HTTPS usage and allows preload list inclusion
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
          // Enables legacy XSS protection mode in older browsers. 1 enables XSS protection and mode=block prevents the page from loading if an attack is detected.
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
          // TODO: discuss which are needed/if they are needed at all. Currently controls access to browser features like geolocation, camera, mic, fullscreen, etc.
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=(), fullscreen=()",
          },
          // Blocks legacy Adobe plugins (i.e. Flash) from loading cross-domain data
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

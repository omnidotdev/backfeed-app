import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    WALLETCONNECT_PROJECT_ID: process.env.WALLETCONNECT_PROJECT_ID,
  },
  // https://github.com/vercel/next.js/issues/44273#issuecomment-1375170722
  webpack: (config) => {
    config.externals.push({
      bufferutil: "commonjs bufferutil",
      encoding: "commonjs encoding",
      "supports-color": "commonjs supports-color",
      "utf-8-validate": "commonjs utf-8-validate",
    });
    return config;
  },
};

export default nextConfig;

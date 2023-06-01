/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
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

module.exports = nextConfig;

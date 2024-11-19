import type { KnipConfig } from "knip";

/**
 * Knip configuration.
 * @see https://knip.dev/overview/configuration
 */
const knipConfig: KnipConfig = {
  // NB: Modified from the default Next.js configuration, see: https://knip.dev/reference/plugins/next
  entry: [
    "next.config.ts",
    "src/{instrumentation,middleware}.ts",
    "src/app/global-error.{ts,tsx}",
    "src/app/**/{error,layout,loading,not-found,page,template,default,route}.{ts,tsx}",
    "src/app/{manifest,sitemap,robots}.ts",
    "src/app/**/{icon,apple-icon}.{ts,tsx}",
    "src/app/**/{opengraph,twitter}-image.{ts,tsx}",
  ],
  // NB: Modified from the default GraphQL Codegen configuration, see: https://knip.dev/reference/plugins/graphql-codegen
  "graphql-codegen": {
    config: ["package.json", "src/lib/graphql/codegen.config.ts"],
  },
  ignore: ["panda.config.ts", "src/generated/**"],
  ignoreDependencies: [
    // @omnidev/sigil peer dependency
    "@ark-ui/react",
    // used by GraphQL Code Generator scripts
    "dotenv",
  ],
};

export default knipConfig;

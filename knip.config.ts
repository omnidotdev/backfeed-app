import type { KnipConfig } from "knip";

/**
 * Knip configuration.
 * @see https://knip.dev/overview/configuration
 */
const knipConfig: KnipConfig = {
  // NB: Modified from the default Next.js configuration, see: https://knip.dev/reference/plugins/next
  entry: [
    "src/{instrumentation,proxy}.ts",
    // "src/app/global-error.{ts,tsx}",
    "src/app/**/{error,layout,loading,not-found,page,template,default,route}.{ts,tsx}",
    // "src/app/{manifest,sitemap,robots}.ts",
    // "src/app/**/{icon,apple-icon}.{ts,tsx}",
    // "src/app/**/{opengraph,twitter}-image.{ts,tsx}",
    "src/test/**/*.{ts,tsx}",
    // NB: include test files and their dependencies as entry points
    "src/**/*.test.{ts,tsx}",
  ],
  // NB: files are reported as unused if they are in the set of project files, but not in the set of files resolved from the entry files. See: https://knip.dev/guides/configuring-project-files
  project: ["src/**/*.{ts,tsx}"],
  // NB: Modified from the default GraphQL Codegen configuration, see: https://knip.dev/reference/plugins/graphql-codegen
  "graphql-codegen": {
    config: ["package.json", "src/lib/graphql/codegen.config.ts"],
  },
  ignoreExportsUsedInFile: true,
  ignore: ["panda.config.ts", "src/__mocks__/**", "src/generated/**"],
  ignoreDependencies: [
    // included by Next.js metapackage, used in Playwright config
    "@next/env",
    // used by GraphQL Code Generator scripts
    "dotenv",
  ],
};

export default knipConfig;

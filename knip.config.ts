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
  // NB: files are reported as unused if they are in the set of project files, but not in the set of files resolved from the entry files. See: https://knip.dev/guides/configuring-project-files
  project: ["src/**/*.{ts,tsx}"],
  // NB: Modified from the default GraphQL Codegen configuration, see: https://knip.dev/reference/plugins/graphql-codegen
  "graphql-codegen": {
    config: ["package.json", "src/lib/graphql/codegen.config.ts"],
  },
  ignore: ["panda.config.ts", "src/generated/**", "src/test/**"],
  ignoreDependencies: [
    // @omnidev/sigil peer dependency
    "@ark-ui/react",
    // used by Bun test runner (for DOM-based tests)
    "@happy-dom/global-registrator",
    // included by Next.js metapackage, used in Playwright config
    "@next/env",
    // used in unit test setup file
    "@testing-library/jest-dom",
    // used by GraphQL Code Generator scripts
    "dotenv",
  ],
};

export default knipConfig;

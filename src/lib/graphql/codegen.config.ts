import { API_GRAPHQL_URL } from "../config/env.config";

import type { CodegenConfig } from "@graphql-codegen/cli";
import type { Types } from "@graphql-codegen/plugin-helpers";

type GraphQLCodegenConfig = Types.ConfiguredOutput;

/**
 * Shared plugins across the generated GraphQL Codegen artifacts.
 */
const sharedPlugins: GraphQLCodegenConfig["plugins"] = [
  "typescript",
  "typescript-operations",
  {
    add: {
      // prepend artifact with TS no-check directive
      content: "// @ts-nocheck",
    },
  },
];

/**
 * Shared configuration across each of the generated GraphQL Codegen artifacts.
 */
const sharedConfig: GraphQLCodegenConfig["config"] = {
  scalars: {
    Date: "Date",
    Datetime: "Date",
    UUID: "string",
    Cursor: "string",
    BigInt: "string",
  },
};

/**
 * GraphQL Code Generator configuration. This generates various artifacts based on the GraphQL schema.
 */
const graphqlCodegenConfig: CodegenConfig = {
  schema: API_GRAPHQL_URL,
  documents: "src/lib/graphql/**/*.graphql",
  // suppress non-zero exit code if there are no documents to generate
  ignoreNoDocuments: true,
  config: {
    // https://github.com/dotansimha/graphql-code-generator/issues/6935#issuecomment
    // https://stackoverflow.com/questions/74623455/how-to-ensure-enum-order-in-graphql
    sort: true,
  },
  generates: {
    // mocks for testing
    "src/generated/graphql.mock.ts": {
      // https://github.com/dotansimha/graphql-code-generator/discussions/9972#discussioncomment-9892339
      preset: "import-types",
      plugins: [
        // filter in only the shared `add` plugin config
        ...sharedPlugins.filter((plugin) =>
          Object.keys(plugin).includes("add"),
        ),
        "typescript-msw",
      ],
      presetConfig: {
        typesPath: "./generated",
      },
    },
    // TypeScript SDK
    "src/generated/graphql.sdk.ts": {
      plugins: [...sharedPlugins, "typescript-graphql-request"],
      config: sharedConfig,
    },
    // React Query hooks, types, and utilities
    "src/generated/graphql.ts": {
      // TODO switch to client preset after DX improves, track https://github.com/dotansimha/graphql-code-generator/discussions/8773
      // preset: "client",
      plugins: [...sharedPlugins, "typescript-react-query"],
      config: {
        ...sharedConfig,
        // https://github.com/dotansimha/graphql-code-generator-community/commit/935b51f0777047102cc1c33a1a18a4527902e0f9#diff-0e40fc3fdce3118ff7551a9e1fcd7216a6ec4951b18ea5d5f356999418e8383eR93-R98
        reactQueryVersion: 5,
        // enable infinite query generation
        addInfiniteQuery: true,
        // https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-react-query#exposequerykeys
        exposeQueryKeys: true,
        // https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-react-query#exposemutationkeys
        exposeMutationKeys: true,
        // https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-react-query#exposefetcher
        exposeFetcher: true,
        // NB: the custom fetcher has the benefits of, among others, integrating async headers directly within the `graphql-request` client and not requiring passing the client to each hook invocation
        fetcher: {
          func: "@/lib/graphql/graphqlFetch#graphqlFetch",
        },
      },
    },
  },
};

export default graphqlCodegenConfig;

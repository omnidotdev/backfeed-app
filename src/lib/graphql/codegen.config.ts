import { API_BASE_URL } from "lib/config/env.config";

import type { CodegenConfig } from "@graphql-codegen/cli";

/**
 * GraphQL Code Generator configuration.
 */
const graphqlCodegenConfig: CodegenConfig = {
  schema: API_BASE_URL,
  documents: "src/lib/graphql/**/*.graphql",
  // suppress non-zero exit code if there are no documents to generate
  ignoreNoDocuments: true,
  config: {
    // https://github.com/dotansimha/graphql-code-generator/issues/6935#issuecomment
    // https://stackoverflow.com/questions/74623455/how-to-ensure-enum-order-in-graphql
    sort: false,
  },
  generates: {
    // TODO switch to client preset after DX improves, track https://github.com/dotansimha/graphql-code-generator/discussions/8773
    // "src/generated/": {
    // preset: "client",
    // plugins: [],
    // },
    "src/generated/graphql.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
        {
          add: {
            // prepend artifact with TS no-check directive
            content: "// @ts-nocheck",
          },
        },
      ],
      config: {
        // https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-react-query#using-graphql-request
        // fetcher: "graphql-request",
        // NB: the custom fetcher hook has the benefits of, among others, integrating async headers directly within the `graphql-request` client and not requiring passing the client to each hook invocation
        fetcher: {
          func: "lib/hooks#useGraphqlClient",
          isReactHook: true,
        },
        // enable infinite query generation
        addInfiniteQuery: true,
        // https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-react-query#exposequerykeys
        exposeQueryKeys: true,
        // https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-react-query#exposefetcher
        // ! NB: this seems to be bugged for custom fetchers, https://github.com/dotansimha/graphql-code-generator-community/issues/202#issuecomment-1541174562
        exposeFetcher: true,
      },
    },
  },
};

export default graphqlCodegenConfig;

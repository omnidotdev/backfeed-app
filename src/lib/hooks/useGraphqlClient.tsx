import { graphqlFetch } from "lib/graphql";

import type { RequestOptions, Variables } from "graphql-request";

/**
 * GraphQL request client.
 * ! NB: this hook is not meant to be used directly. It is intended to be used by GraphQL Code Generator as a custom fetch implementation.
 * Ref: https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-react-query#usage-example-isreacthook-true
 */
const useGraphqlClient =
  <TData, TVariables extends Variables>(
    query: RequestOptions["document"],
    options?: RequestInit["headers"]
  ): ((variables?: TVariables) => Promise<TData>) =>
  async (variables?: TVariables) =>
    graphqlFetch({ query, variables, options });

export default useGraphqlClient;

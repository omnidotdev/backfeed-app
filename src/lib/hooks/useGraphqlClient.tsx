import { request } from "graphql-request";

import { API_BASE_URL } from "lib/config/env.config";

import type { Variables } from "graphql-request";

/**
 * GraphQL request client.
 * ! NB: this hook is not meant to be used directly. It is intended to be used by GraphQL Code Generator as a custom fetch implementation.
 * Ref: https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-react-query#usage-example-isreacthook-true
 */
const useGraphqlClient =
  <TData, TVariables extends Variables>(
    query: string,
    options?: RequestInit["headers"]
  ): ((variables?: TVariables) => Promise<TData>) =>
  async (variables?: TVariables) =>
    await request({
      url: API_BASE_URL!,
      document: query,
      variables,
      requestHeaders: { ...options },
    });

export default useGraphqlClient;

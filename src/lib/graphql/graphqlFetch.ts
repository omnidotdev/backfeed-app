import { request } from "graphql-request";

import { API_BASE_URL } from "lib/config";

import type { RequestOptions, Variables } from "graphql-request";

interface Params<TVariables> {
  /** GraphQL request operation payload. Can be a string or a generated document. */
  query: RequestOptions["document"];
  /** GraphQL request variables payload. */
  variables?: TVariables;
  /** GraphQL request options. */
  options?: RequestInit["headers"];
}

/**
 * GraphQL fetch wrapper.
 */
const graphqlFetch = async <TData, TVariables extends Variables>({
  query,
  variables,
  options,
}: Params<TVariables>) =>
  request<TData>({
    url: API_BASE_URL!,
    document: query,
    variables,
    requestHeaders: { ...options },
  });

export default graphqlFetch;

import { parse } from "graphql";
import { GraphQLClient, gql } from "graphql-request";

import { API_GRAPHQL_URL } from "@/lib/config/env.config";
import { fetchSession } from "@/server/functions/auth";

import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { Variables } from "graphql-request";

type FetchOptions = {
  /** Request cache setting. */
  cache?: RequestCache;
};

/**
 * GraphQL fetch wrapper. This is a wrapper around `graphql-request` that adds support for request options.
 * ! NB: this wrapper is not meant to be used directly. It is intended to be used by GraphQL Code Generator as a custom fetch implementation.
 */
export const graphqlFetch =
  <TData, TVariables>(
    query: string,
    variables?: TVariables,
    options?: (HeadersInit & FetchOptions) | FetchOptions,
  ) =>
  async (): Promise<TData> => {
    const { session } = await fetchSession();

    const { cache, ...restOptions } = options || {};

    const client = new GraphQLClient(API_GRAPHQL_URL!, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken ?? ""}`,
        ...restOptions,
      },
      cache,
    });

    const document: TypedDocumentNode<TData, Variables> = parse(gql`${query}`);

    return client.request({
      document,
      variables: variables as Variables,
    });
  };

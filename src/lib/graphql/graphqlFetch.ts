import { parse } from "graphql";
import { GraphQLClient, gql } from "graphql-request";

import { API_BASE_URL } from "lib/config";
import { getAuthSession } from "lib/server";

import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { Variables } from "graphql-request";

type FetchOptions = {
  /** Request cache setting. */
  cache?: RequestCache;
  /** Next.js request options. */
  next?: NextFetchRequestConfig;
};

/**
 * GraphQL fetch wrapper. This is a wrapper around `graphql-request` that adds support for Next.js request options.
 * ! NB: this wrapper is not meant to be used directly. It is intended to be used by GraphQL Code Generator as a custom fetch implementation.
 * @knipignore - this wrapper is used by GraphQL Code Generator as a custom fetch implementation.
 */
export const graphqlFetch =
  <TData, TVariables>(
    query: string,
    variables?: TVariables,
    options?: (HeadersInit & FetchOptions) | FetchOptions
  ) =>
  async (): Promise<TData> => {
    const session = await getAuthSession();

    const { next, cache, ...restOptions } = options || {};

    const client = new GraphQLClient(API_BASE_URL!, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken ?? ""}`,
        ...restOptions,
      },
      next,
      cache,
    });

    const document: TypedDocumentNode<TData, Variables> = parse(gql`${query}`);

    return client.request({
      document,
      variables: variables as Variables,
    });
  };

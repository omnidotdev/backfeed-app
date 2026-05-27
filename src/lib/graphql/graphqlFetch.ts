import { parse } from "graphql";
import { ClientError, gql } from "graphql-request";

import { getGraphQLClient } from "@/lib/graphql/graphqlClientFactory";
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
 *
 * Fetches a fresh access token from better-auth via server function for each request,
 * ensuring tokens are never stale after idle periods.
 */
export const graphqlFetch =
  <TData, TVariables>(
    query: string,
    variables?: TVariables,
    options?: (HeadersInit & FetchOptions) | FetchOptions,
  ) =>
  async (): Promise<TData> => {
    // Fetch fresh session with access token via server function
    const { session } = await fetchSession();
    const accessToken = session?.accessToken;

    const { cache, ...restOptions } = options || {};
    const client = getGraphQLClient();
    const document: TypedDocumentNode<TData, Variables> = parse(gql`${query}`);

    try {
      return await client.request({
        document,
        variables: variables as Variables,
        requestHeaders: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
          ...restOptions,
        },
      });
    } catch (error) {
      // Redirect to re-auth on 401 (expired/invalid token)
      if (
        error instanceof ClientError &&
        error.response.status === 401 &&
        typeof window !== "undefined"
      ) {
        window.location.href = "/";
      }

      throw error;
    }
  };

import { GraphQLClient } from "graphql-request";

import {
  API_GRAPHQL_URL,
  API_INTERNAL_GRAPHQL_URL,
} from "@/lib/config/env.config";

let clientSideClient: GraphQLClient | null = null;
let serverSideClient: GraphQLClient | null = null;

/**
 * Get the GraphQL client instance.
 *
 * Uses the internal API URL for server-side requests (Docker container-to-container)
 * and the public API URL for client-side requests (browser).
 *
 * Note: Auth headers are NOT set on the client directly.
 * Instead, `graphqlFetch` fetches a fresh access token via server function
 * and passes it in the request headers for each request.
 */
export const getGraphQLClient = (): GraphQLClient => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    if (!serverSideClient) {
      serverSideClient = new GraphQLClient(API_INTERNAL_GRAPHQL_URL!, {
        headers: { "Content-Type": "application/json" },
      });
    }
    return serverSideClient;
  }

  if (!clientSideClient) {
    clientSideClient = new GraphQLClient(API_GRAPHQL_URL!, {
      headers: { "Content-Type": "application/json" },
    });
  }
  return clientSideClient;
};

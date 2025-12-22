import { GraphQLClient } from "graphql-request";

import { getSdk as getGraphQLSdk } from "@/generated/graphql.sdk";
import { API_GRAPHQL_URL } from "@/lib/config/env.config";
import { fetchSession } from "@/server/functions/auth";

/**
 * Utility for getting the GraphQL client SDK.
 */
const getSdk = async () => {
  const { session } = await fetchSession();

  const graphqlClient = new GraphQLClient(API_GRAPHQL_URL!, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  return getGraphQLSdk(graphqlClient);
};

export default getSdk;

import { GraphQLClient } from "graphql-request";

import { auth } from "auth";
import { getSdk as getGraphQLSdk } from "generated/graphql.sdk";
import { API_BASE_URL } from "lib/config";

/**
 * Utility for getting the GraphQL client SDK.
 */
const getSdk = async () => {
  const session = await auth();

  const graphqlClient = new GraphQLClient(API_BASE_URL!, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  return getGraphQLSdk(graphqlClient);
};

export default getSdk;

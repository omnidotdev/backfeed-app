import { GraphQLClient } from "graphql-request";

import { getSdk as getGraphQLSdk } from "generated/graphql.sdk";
import { API_BASE_URL } from "lib/config";
import { getAuthSession } from "lib/util";

/**
 * Utility for getting the GraphQL client SDK.
 */
const getSdk = async () => {
  const session = await getAuthSession();

  const graphqlClient = new GraphQLClient(`${API_BASE_URL!}/graphql`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
  });

  return getGraphQLSdk(graphqlClient);
};

export default getSdk;

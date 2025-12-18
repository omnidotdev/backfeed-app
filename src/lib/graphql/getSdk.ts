import { GraphQLClient } from "graphql-request";

import { getSdk as getGraphQLSdk } from "generated/graphql.sdk";
import { API_GRAPHQL_URL } from "lib/config";

import type { AuthSession } from "lib/util/getAuthSession/getAuthSession";

interface Options {
  /** Auth session required to retrieve the appropriate `accessToken`.  */
  session: AuthSession;
}

/**
 * Utility for getting the GraphQL client SDK.
 */
const getSdk = ({ session }: Options) => {
  const graphqlClient = new GraphQLClient(API_GRAPHQL_URL!, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  return getGraphQLSdk(graphqlClient);
};

export default getSdk;

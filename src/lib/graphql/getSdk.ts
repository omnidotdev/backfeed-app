import { GraphQLClient } from "graphql-request";

import { getSdk as getGraphQLSdk } from "generated/graphql.sdk";
import { API_GRAPHQL_URL } from "lib/config";

import type { Session } from "next-auth";

interface Options {
  /** Auth session required to retrieve the appropriate `accessToken`.  */
  session: Session;
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

import { GraphQLClient } from "graphql-request";

import { getSdk } from "generated/graphql.sdk";
import { API_BASE_URL } from "lib/config";

/**
 * GraphQL client SDKs
 */
const sdk = ({ headers }: { headers?: HeadersInit } = {}) => {
  const graphqlClient = new GraphQLClient(API_BASE_URL!, { headers });

  return getSdk(graphqlClient);
};

export default sdk;
